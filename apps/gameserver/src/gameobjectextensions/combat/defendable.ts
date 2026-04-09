
import type { Vector2 } from '@repo/geometry';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import { DamageResultType } from '@repo/packets/base/s2c/0x65-UnitApplyDamage';
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import type { CastData } from '@repo/scripting/base/spell';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { ChannelingStopSource } from '../../constants/enums';
import type Missile from '../../gameobjects/missiles/missile';
import type { Hero, Player } from '../../gameobjects/unit-ai';
import { AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import * as Measure from '../measure';
import type { BuffAddOptions } from '../traits/buff-manager';
import Targetable from './targetable';


export type AssistMarker = {
	unit: AttackableUnit;
	time: number;
	duration: number;
};

export type DamageData = {
	damageAmount: number,
	damageType: DamageType,
	damageSource: DamageSource,
};

export type AllowAddBuff = {
	allowAddBuff: boolean,
};

export type DefendableEvents = {
	'dealDamage': (target: AttackableUnit, e: DamageData) => void;
	'hitUnit': (target: AttackableUnit, e: DamageData, castData: Pick<CastData, 'spell'> | undefined) => void;
	'beingHit': (source: AttackableUnit, e: DamageData, castData: Pick<CastData, 'spell'> | undefined) => void;
	'beingSpellHit': (castData: CastData, source: AttackableUnit) => void;
	'preDamage': (source: AttackableUnit, e: DamageData) => void;
	'preDealDamage': (source: AttackableUnit, e: DamageData) => void;
	'preMitigationDamage': (source: AttackableUnit, e: DamageData) => void;
	'spellHit': (castData: CastData, target: AttackableUnit) => void;
	'takeDamage': (source: AttackableUnit, e: DamageData) => void;
	'kill': (target: AttackableUnit) => void;
	'nearbyDeath': (unit: AttackableUnit) => void;
	'death': (source: AttackableUnit, assists: AttackableUnit[]) => void;
	'assist': (target: AttackableUnit) => void;
	'heal': (target: AttackableUnit, e: { healAmount: number }) => void;
	'launchAttack': (target: AttackableUnit) => void;
	'launchMissile': (missile: Missile, destination: Vector2) => void;
	'missileEnd': (missile: Missile) => void;
	'preAttack': (target: AttackableUnit, e: { skipNextAutoAttack: boolean }) => void;
	'miss': (target: AttackableUnit) => void;
	'dodge': (source: AttackableUnit) => void;
	'resurrect': () => void;
	'checkAllowAddBuff': (attacker: AttackableUnit, options: BuffAddOptions, e: AllowAddBuff) => void;
};

/**
 * Trait for units that can be attacked
 */
export default class Defendable extends Targetable {
	declare readonly owner: AttackableUnit;
	respawnable = false;
	assistMarkers: AssistMarker[] = [];
	died = 0;

	targetableToAlly = true;
	targetableToEnemy = true;

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner);
		this.respawnable = respawnable;

		owner.eventEmitter.on('death', (attacker, assists) => {
			const owner = this.owner;

			try {
				owner.combat.cancelChanneling(ChannelingStopSource.die);
			} catch (e) {
				console.error(e);
			}

			owner.issueOrder(IssueOrderType.orderNone);
			owner.onDie(attacker, assists);

			if (!this.respawnable) {
				owner.destroy();
			}
		});
	}

	sendUnitApplyDamage(source: AttackableUnit, damage: { resultType?: number; type?: number; amount?: number; }) {
		const target = this.owner;
		if (target.characterState.noRender || target.character.neverRender)
			return;

		const packet1 = packets.UnitApplyDamage.create({
			netId: target.netId,
			damageResultType: damage.resultType ?? DamageResultType.normal,
			//unknown1: 125,
			//damageType: damage.type ?? DamageType.mixed,
			damage: damage.amount || 0,
			targetNetId: target.netId,
			sourceNetId: source.netId,
		});
		target.packets.toEveryone(packet1);
	}

	private damageModPlus(mod: number) {
		return 100 / (100 + mod);
	}

	private damageModMinus(mod: number) {
		return 2 - (100 / (100 - mod));
	}

	private mitigateDamage(source: AttackableUnit, e: DamageData) {
		const target = this.owner;
		source.eventEmitter.emit('preMitigationDamage', target, e);

		let defense = 0;

		if (e.damageType === DamageType.physical) {
			const defAmount = target.stats.armor.total;
			const penetration = source.stats.armorPenetration;

			defense = (defAmount - penetration.flatBonus) * (1 - penetration.percentBonus);
		}
		else if (e.damageType === DamageType.magic) {
			const defAmount = target.stats.magicResist.total;
			const penetration = source.stats.magicPenetration;

			defense = (defAmount - penetration.flatBonus) * (1 - penetration.percentBonus);
		}

		let mod = 1;

		if (defense !== 0) {
			if (defense > 0)
				mod = this.damageModPlus(defense);
			else
				mod = this.damageModMinus(defense);
		}

		return e.damageAmount * mod;
	}

	private dealDamage(source: AttackableUnit, e: DamageData) {
		const target = this.owner;
		source.eventEmitter.emit('preDealDamage', target, e);

		target.stats.health.current -= e.damageAmount;
		this.addAssistMarker(source);

		this.sendUnitApplyDamage(source, {
			amount: e.damageAmount,
		});

		target.packets.sendOnEnterLocalVisibilityClient();

		source.eventEmitter.emit('dealDamage', target, e);
		target.eventEmitter.emit('takeDamage', source, e);

		if (target.stats.health.current <= 0)
			this.die(source);
	}

	getDamageRatio(source: AttackableUnit, target: AttackableUnit) {
		if (!source.ai || !target.ai)
			return 1;

		const mapConstants = Server.map.constants;

		const sourceIsHero = source.ai.type === AiType.Hero;
		const targetIsHero = target.ai.type === AiType.Hero;
		if (sourceIsHero && targetIsHero)
			return mapConstants.dr_HeroToHero;

		const sourceIsBuilding = source.ai.type === AiType.Building;
		if (sourceIsBuilding && targetIsHero)
			return mapConstants.dr_BuildingToHero;

		const sourceIsUnit = source.ai.type === AiType.Minion;
		if (sourceIsUnit && targetIsHero)
			return mapConstants.dr_UnitToHero;

		const targetIsUnit = target.ai.type === AiType.Minion;
		if (sourceIsHero && targetIsUnit)
			return mapConstants.dr_HeroToUnit;

		if (sourceIsBuilding && targetIsUnit)
			return mapConstants.dr_BuildingToUnit;

		if (sourceIsUnit && targetIsUnit)
			return mapConstants.dr_UnitToUnit;

		const targetIsBuilding = target.ai.type === AiType.Building;
		if (sourceIsHero && targetIsBuilding)
			return mapConstants.dr_HeroToBuilding;

		if (sourceIsBuilding && targetIsBuilding)
			return mapConstants.dr_BuildingToBuilding;

		if (sourceIsUnit && targetIsBuilding)
			return mapConstants.dr_UnitToBuilding;

		return 1;
	}

	checkIfMiss(source: AttackableUnit, e: DamageData) {
		if (e.damageSource !== DamageSource.attack)
			return false;

		const missChance = source.stats.missChance.total;
		const missed = Math.random() < missChance;
		if (missed)
			return true;

		if (!source.characterState.dodgePiercing) {
			const target = this.owner;
			const dodge = target.stats.dodge.total;
			const dodged = Math.random() < dodge;
			if (dodged)
				return true;
		}

		return false;
	}

	damage(source: AttackableUnit, e: DamageData, castData: Pick<CastData, 'spell'> | undefined = undefined) {
		const target = this.owner;

		if (e.damageSource !== DamageSource.raw && e.damageSource !== DamageSource.internalRaw) {
			if (source.team.id === target.team.id)
				return;
		}

		const characterState = target.characterState;
		if (characterState.invulnerable)
			return;

		if (e.damageSource === DamageSource.attack) {
			// TODO: move it to basic attack only
			const isMiss = this.checkIfMiss(source, e);
			if (isMiss) {
				source.eventEmitter.emit('miss', target);
				target.eventEmitter.emit('dodge', source);
				return;
			}

			source.eventEmitter.emit('hitUnit', target, e, castData);
			target.eventEmitter.emit('beingHit', source, e, castData);
		}

		target.eventEmitter.emit('preDamage', source, e);

		//console.log('damage', dmg, this.health.current, this.health.total);
		let damage = this.mitigateDamage(source, e);
		damage *= this.getDamageRatio(source, target);
		e.damageAmount = damage;

		if (damage <= 0) {
			(source.ai as Player).packets?.chatBoxDebugMessage('damaged with 0 damage');
			return;
		}

		this.dealDamage(source, e);
	}

	private getKillers(clean = false) {
		const target = this.owner;
		const appTime = Server.gameLoop.timer;

		const killers = this.assistMarkers.filter(assist => {
			if (assist.unit === target)
				return false;

			if (assist.unit.team.id === target.team.id)
				return false;

			if (assist.time + (assist.duration * 1000) < appTime)
				return false;

			return true;
		});

		if (clean)
			this.assistMarkers = [];

		killers.reverse();
		return killers;
	}

	private getKillerAssistants(killers: AssistMarker[]) {
		let killerAssistants: AssistMarker[] = [];
		const appTime = Server.gameLoop.timer;

		killers.forEach(killer => {
			const killerAssistants1 = killer.unit.combat.assistMarkers.filter(assist => {
				if (assist.unit === killer.unit)
					return false;

				if (assist.unit.team.id !== killer.unit.team.id)
					return false;

				if (assist.time + (assist.duration * 1000) < appTime)
					return false;

				return true;
			});
			killerAssistants = killerAssistants.concat(killerAssistants1);
		});

		killerAssistants.sort((a, b) => b.time - a.time);
		return killerAssistants;
	}

	private getAssists(clean = false) {
		const killers = this.getKillers(clean);
		const killerAssistants = this.getKillerAssistants(killers);
		//console.log('killers', killers.map(k => k.unit.name));
		//console.log('killerAssistants', killerAssistants.map(k => k.unit.name));

		let assists = killers.concat(killerAssistants);

		// make it unique
		assists = assists.filter((assist, index) => {
			return assists.findIndex(a => a.unit === assist.unit) === index;
		});

		return assists;
	}

	sendDie(source: AttackableUnit) {
		// @todo
		const target = this.owner;
		//if (target.characterState.noRender || target.character.neverRender)
		//	return;

		const heroPackets = (target.ai as Hero).packets;
		if (heroPackets) {
			heroPackets.Die(source);
		}
		else {
			target.packets.Die(source);
		}
	}

	die(source: AttackableUnit) {
		if (this.died)
			return;

		const now = Server.gameLoop.timer;
		this.died = now;

		const assists = this.getAssists(true).filter(k => k.unit !== source);

		//// priority hero as killer @todo on champion kill only
		//const heroAssists = assists.filter(assist => assist.unit.ai?.type === AiType.Hero);
		//if (source.ai?.type !== AiType.Hero && heroAssists[0])
		//	source = heroAssists[0].unit;

		this.sendDie(source);

		const target = this.owner;
		source.eventEmitter.emit('kill', target);
		target.eventEmitter.emit('death', source, assists.map(a => a.unit));

		if (target.ai.type === AiType.Hero) {
			for (let i = 0; i < assists.length; i++) {
				const assist = assists[i]!;
				assist.unit.eventEmitter.emit('assist', target);
			}
		}

		const units = GameObjectList.aliveUnits;
		const nearbyUnits = Measure.centerToCenter.filterByRange(target, units, 1000);
		for (let i = 0; i < nearbyUnits.length; i++) {
			const nearbyUnit = nearbyUnits[i]!;
			if (nearbyUnit === target)
				continue;

			nearbyUnit.eventEmitter.emit('nearbyDeath', target);
		}
	}

	canBeAttacked() {
		return !this.died && !this.owner.characterState.invulnerable;
	}

	heal(source: AttackableUnit, healAmount: number) {
		const target = this.owner;

		const e = { healAmount };
		source.eventEmitter.emit('heal', target, e);
		healAmount = e.healAmount;

		target.stats.health.current += healAmount;
		this.addAssistMarker(source);

		target.packets.sendOnEnterLocalVisibilityClient();
	}

	healPercent(source: AttackableUnit, hpPercent: number) {
		const target = this.owner;
		this.heal(source, target.stats.health.total * hpPercent / 100);
	}

	addAssistMarker(unit: AttackableUnit, duration = 10) {
		const now = Server.gameLoop.timer;
		this.assistMarkers.push({
			unit,
			time: now,
			duration,
		});
	}

}
