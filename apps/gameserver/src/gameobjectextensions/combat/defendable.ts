
import type { Vector2 } from '@repo/geometry';
import { DamageResultType } from '@repo/packets/base/s2c/0x65-UnitApplyDamage';
import * as packets from '@repo/packets/list';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import GameObjectList from '../../app/game-object-list';
import Timer from '../../core/timer';
import type Missile from '../../gameobjects/missiles/missile';
import type { Hero, Player } from '../../gameobjects/unit-ai';
import { AiSubType, AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import * as Measure from '../measure';
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

export type DefendableEvents = {
	'dealDamage': (target: AttackableUnit, e: DamageData) => void;
	'hitUnit': (target: AttackableUnit, e: DamageData) => void;
	'beingHit': (source: AttackableUnit, e: DamageData) => void;
	'beingSpellHit': (source: AttackableUnit, e: DamageData) => void;
	'preDamage': (source: AttackableUnit, e: DamageData) => void;
	'preDealDamage': (source: AttackableUnit, e: DamageData) => void;
	'preMitigationDamage': (source: AttackableUnit, e: DamageData) => void;
	'spellHit': (target: AttackableUnit, e: DamageData) => void;
	'takeDamage': (source: AttackableUnit, e: DamageData) => void;
	'kill': (target: AttackableUnit) => void;
	'nearbyDeath': (unit: AttackableUnit) => void;
	'death': (source: AttackableUnit, assists: AttackableUnit[]) => void;
	'assist': (target: AttackableUnit) => void;
	'heal': (target: AttackableUnit, e: { healAmount: number }) => void;
	'launchAttack': (target: AttackableUnit) => void;
	'launchMissile': (missile: Missile, destination: Vector2) => void;
	'missileEnd': (missile: Missile) => void;
	'preAttack': (target: AttackableUnit) => void;
	'miss': (target: AttackableUnit) => void;
	'dodge': (source: AttackableUnit) => void;
	'resurrect': () => void;
};

/**
 * Trait for units that can be attacked
 */
export default class Defendable extends Targetable {
	declare readonly owner: AttackableUnit;
	respawnable = false;
	assistMarkers: AssistMarker[] = [];
	died = 0;

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner);
		this.respawnable = respawnable;

		this.owner.eventEmitter.once('spawn', () => {
			const ai = owner.ai;
			if (ai) {
				// do not die while testing @todo remove it
				this.unkillable = ai.subType === AiSubType.Player;
			}
		});

		this.owner.eventEmitter.on('death', (attacker, assists) => {
			this.owner.eventEmitter.emit('changeOrder');
			this.owner.onDie(attacker, assists);

			if (!this.respawnable)
				this.owner.eventEmitter.emit('destroy');
		});
	}

	get unkillable() {
		return this.owner.stats.health.minimum > 0;
	}

	set unkillable(value: boolean) {
		this.owner.stats.health.minimum = value ? 1 : 0;
	}

	sendUnitApplyDamage(source: AttackableUnit, damage: { resultType?: number; type?: number; amount?: number; }) {
		const packet1 = packets.UnitApplyDamage.create({
			netId: this.owner.netId,
			damageResultType: damage.resultType || DamageResultType.normal,
			//unknown1: 125,
			//damageType: damage.type || DamageType.mixed,
			damage: damage.amount || 0,
			targetNetId: this.owner.netId,
			sourceNetId: source.netId,
		});
		this.owner.packets.toEveryone(packet1);
	}

	private damageModPlus(mod: number) {
		return 100 / (100 + mod);
	}

	private damageModMinus(mod: number) {
		return 2 - (100 / (100 - mod));
	}

	private mitigateDamage(source: AttackableUnit, e: DamageData) {
		source.eventEmitter.emit('preMitigationDamage', this.owner, e);

		let defense = 0;

		if (e.damageType === DamageType.physical) {
			const defAmount = this.owner.stats.armor.total;
			const penetration = source.stats.armorPenetration;

			defense = (defAmount - penetration.flatBonus) * (1 - penetration.percentBonus);
		}
		else if (e.damageType === DamageType.magic) {
			const defAmount = this.owner.stats.magicResist.total;
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
		source.eventEmitter.emit('preDealDamage', this.owner, e);

		this.owner.stats.health.current -= e.damageAmount;
		this.assistMarkers.push({
			unit: source,
			time: Timer.app.now(),
			duration: 10,
		});

		this.sendUnitApplyDamage(source, {
			amount: e.damageAmount,
		});

		this.owner.packets.OnEnterLocalVisibilityClient();

		source.eventEmitter.emit('dealDamage', this.owner, e);
		this.owner.eventEmitter.emit('takeDamage', source, e);

		if (this.owner.stats.health.current <= 0)
			this.die(source);
	}

	getDamageRatio(source: AttackableUnit, target: AttackableUnit) {
		if (!source.ai || !target.ai)
			return 1;

		const targetIsHero = target.ai.type === AiType.Hero;
		const sourceIsUnit = source.ai.type === AiType.Minion;
		if (sourceIsUnit && targetIsHero)
			return 0.7;

		const targetIsBuilding = target.ai.type === AiType.Building;
		if (sourceIsUnit && targetIsBuilding)
			return 0.5;

		return 1;
	}

	damage(source: AttackableUnit, e: DamageData) {
		const target = this.owner;

		//if (source.team.id === target.team.id)
		//	return;

		const blinded = false;
		if (blinded) {
			// TODO: move it to basic attack only
			source.eventEmitter.emit('miss', target);
			target.eventEmitter.emit('dodge', source);
			return;
		}

		source.eventEmitter.emit('preDamage', source, e);

		if (e.damageSource === DamageSource.attack) {
			source.eventEmitter.emit('hitUnit', target, e);
			target.eventEmitter.emit('beingHit', source, e);
		}
		else if (e.damageSource === DamageSource.spell) {
			source.eventEmitter.emit('spellHit', target, e);
			target.eventEmitter.emit('beingSpellHit', source, e);
		}

		//console.log('damage', dmg, this.health.current, this.health.total);
		let damage = this.mitigateDamage(source, e);
		damage *= this.getDamageRatio(source, target);

		if (damage <= 0) {
			(source.ai as Player)?.packets?.chatBoxDebugMessage('damaged with 0 damage');
			return;
		}

		this.dealDamage(source, e);
	}

	private getKillers(clean = false) {
		const killers = this.assistMarkers.filter(assist => {
			if (assist.unit === this.owner)
				return false;

			if (assist.unit.team.id === this.owner.team.id)
				return false;

			if (assist.time + (assist.duration * 1000) < Timer.app.now())
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

		killers.forEach(killer => {
			const killerAssistants1 = killer.unit.combat.assistMarkers.filter(assist => {
				if (assist.unit === killer.unit)
					return false;

				if (assist.unit.team.id !== killer.unit.team.id)
					return false;

				if (assist.time + (assist.duration * 1000) < Timer.app.now())
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
		const heroPackets = (this.owner.ai as Hero).packets;
		if (heroPackets) {
			heroPackets.Die(source);
		}
		else {
			this.owner.packets.Die(source);
		}
	}

	die(source: AttackableUnit) {
		if (this.died)
			return;

		this.died = Timer.app.now();

		const assists = this.getAssists(true).filter(k => k.unit !== source);

		//// priority hero as killer @todo on champion kill only
		//const heroAssists = assists.filter(assist => assist.unit.ai?.type === AiType.Hero);
		//if (source.ai?.type !== AiType.Hero && heroAssists[0])
		//	source = heroAssists[0].unit;

		this.sendDie(source);

		source.eventEmitter.emit('kill', this.owner);
		this.owner.eventEmitter.emit('death', source, assists.map(a => a.unit));

		for (let i = 0; i < assists.length; i++) {
			const assist = assists[i]!;
			assist.unit.eventEmitter.emit('assist', this.owner);
		}

		const units = GameObjectList.aliveUnits;
		const nearbyUnits = Measure.centerToCenter.filterByRange(this.owner, units, 1000);
		for (let i = 0; i < nearbyUnits.length; i++) {
			const nearbyUnit = nearbyUnits[i]!;
			if (nearbyUnit === this.owner)
				continue;

			nearbyUnit.eventEmitter.emit('nearbyDeath', this.owner);
		}
	}

	canBeAttacked() {
		return !this.died;
	}

	heal(source: AttackableUnit, healAmount: number) {
		const e = { healAmount };
		source.eventEmitter.emit('heal', this.owner, e);
		healAmount = e.healAmount;

		this.owner.stats.health.current += healAmount;
		this.assistMarkers.push({
			unit: source,
			time: Timer.app.now(),
			duration: 10,
		});

		this.owner.packets.OnEnterLocalVisibilityClient();
	}

	healPercent(source: AttackableUnit, hpPercent: number) {
		this.heal(source, this.owner.stats.health.total * hpPercent / 100);
	}

	addAssistMarker(unit: AttackableUnit, addDuration = 0) {
		this.assistMarkers.push({
			unit,
			time: Timer.app.now(),
			duration: 10 + addDuration,
		});
	}

}
