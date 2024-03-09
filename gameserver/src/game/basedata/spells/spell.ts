
import * as packets from '@workspace/packets/packages/packets';
import HashString from '@workspace/packets/packages/packets/functions/hash-string';
import SpellCast from './spell-cast';
import type { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';
import * as Measure from '../../../gameobjects/extensions/measure';
import type AttackableUnit from '../../../gameobjects/units/attackable-unit';
import Server from '../../../app/server';
import type Missile from '../../../gameobjects/missiles/missile';
import SpellChain from './spell-chain';
import GameObjectList from '../../../app/game-object-list';
import { Vector2 } from 'three';

export type SpellData = {
	packet?: packets.CastSpellReqModel;
	spell?: _Spell;
	spellChain: SpellChain;
	target?: AttackableUnit;
	targetPosition?: Vector2;
	canMoveWhenCast?: boolean;
	spellCast?: SpellCast;
};

export type SpellOptions = {
	owner: AttackableUnit;
	parentSpell?: _Spell;
	spellChain?: SpellChain;
};

export type ProjectileData = {
	speed: number;
};

export default class _Spell {

	static childSpellList: typeof _Spell[] = [];

	packageHash = 0;
	spellLevel = 1;
	slot = 0;
	package = {};

	owner;
	spellSlot = 255;
	cooldown = 0;
	manaCost = 0;

	windup = 0.05;//?
	castInfo: Partial<SCastInfoModel> = {};
	spellHash: number;

	parentSpell?: _Spell = undefined;
	childSpells: _Spell[] = [];

	isProjectile = false;
	projectileData?: ProjectileData = undefined;
	castRange = Server.map.diagonal;
	canMoveWhenCast = false;

	_lastCastTime = 0;
	_cooldownTime = 0;

	measure = Measure.centerToCenter;

	get base() {
		return this.constructor as any as typeof _Spell;
	}

	constructor(options: SpellOptions) {
		this.owner = options.owner || undefined;

		this.parentSpell = options.parentSpell || undefined;
		this.spellHash = HashString.HashString(this.constructor.name);

		this.base.childSpellList.forEach(spell => {
			this.childSpells.push(new spell({ ...options, parentSpell: this }));
		});
	}

	/**
	 * @throws
	 */
	async preCast(spellData: SpellData) {
		let target = spellData.target;
		if (!target)
			return;

		let range = this.castRange;
		let rangeSum = this.measure.getRangeSum(this.owner, target, range);

		await this.owner.moving.moveToRange(target, rangeSum);
	}

	/**
	 * @abstract
	 */
	onCast(spellData: SpellData) {

	}

	/**
	 * @abstract
	 */
	async afterCast(spellData: SpellData) {
		if (spellData.spellCast) {
			if (this.isProjectile)
				this.spawnProjectileAns(spellData.spellCast.castInfo, 0, this.projectileData);
			else
				this.castSpellAns(spellData.spellCast.castInfo);
		}

		//console.log('afterCast', spellData);
		let l = this.childSpells.length;
		for (let i = 0; i < l; i++)
			await this.childSpells[i].castChain(spellData);

	}

	async castChain(spellData: SpellData) {
		spellData.spell = this;

		if (!spellData.target) {
			if (spellData.packet) {
				const targetNetId = spellData.packet.targetNetId;
				if (targetNetId) {
					const target = GameObjectList.unitByNetId(targetNetId);

					if (!target)
						throw new Error(`target ${targetNetId} not found`);

					if (target.combat.died)
						throw new Error(`target ${targetNetId} is dead`);

					spellData.target = target;
				}
			}
		}

		if (!spellData.targetPosition) {
			if (spellData.target) {
				spellData.targetPosition = spellData.target.position;
			}
			else if (spellData.packet) {
				spellData.targetPosition = new Vector2(spellData.packet.position.x, spellData.packet.position.y);
			}
		}

		spellData.canMoveWhenCast = this.canMoveWhenCast;

		await this.preCast(spellData);

		if (this.waitingCooldown())
			throw new Error('waiting cooldown');

		this._lastCastTime = performance.now();
		this._cooldownTime = this._lastCastTime + (this.cooldown * 1000);

		this.owner.eventEmitter.emit('spellCasting', spellData);
		spellData.spellCast = new SpellCast(spellData);

		await Promise.delay(this.windup * 1000);
		this.onCast(spellData);
		await this.afterCast(spellData);

	}

	async cast(spellData: Partial<SpellData>) {

		if (!spellData.spellChain)
			spellData.spellChain = new SpellChain();

		try {
			await this.castChain(spellData as SpellData);
			this.owner.eventEmitter.emit('spellCastingEnd', spellData as SpellData);
			return true;
		}
		catch (e) {
			//console.log(e);
			return false;
		}
	}

	castSpellAns(castInfo: Partial<SCastInfoModel>, packageHash: number = 0) {
		let owner = this.owner;

		const packet1 = packets.CastSpellAns.create({
			netId: owner.netId,
			casterPositionSyncId: owner.moving?.moveTime || 1,
			castInfo: {
				spellHash: 0,
				castNetId: 1073743439,
				spellLevel: 1,
				attackSpeedModifier: 1,
				casterNetId: owner.netId,
				spellChainOwnerNetId: owner.netId,
				packageHash: packageHash,
				missileNetId: 1073743440,
				targetPosition: { x: 0, y: 0, z: 0 },
				targetPositionEnd: { x: 0, y: 0, z: 0 },
				designerCastTime: 0.25,
				designerTotalTime: 0.25,
				manaCost: 28,
				spellCastLaunchPosition: {
					x: owner.position.x,
					y: owner.position.y,
					z: 0,
				},
				ammoUsed: 1,
				targets: [{
					unit: 0,
					hitResult: 0,
				}],
				...castInfo,
			} as SCastInfoModel,
		});

		owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	spawnProjectileAns(castInfo: Partial<SCastInfoModel>, packageHash: number = 0, projectile: ProjectileData = { speed: 1200 }) {
		let owner = this.owner;

		const castInfo2 = {
			spellHash: 0,
			castNetId: 1073743439,
			spellLevel: 1,
			attackSpeedModifier: 1,
			casterNetId: owner.netId,
			spellChainOwnerNetId: owner.netId,
			packageHash: packageHash,
			missileNetId: 1073743440,
			targetPosition: { x: 0, y: 0, z: 0 },
			targetPositionEnd: { x: 0, y: 0, z: 0 },
			designerCastTime: 0.25,
			designerTotalTime: 0.25,
			manaCost: 28,
			spellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			ammoUsed: 1,
			targets: [{
				unit: 0,
				hitResult: 0,
			}],
			...castInfo,
		} as SCastInfoModel;

		const packet1 = packets.MissileReplication.create({
			netId: castInfo.missileNetId ?? castInfo.castNetId,
			position: castInfo.spellCastLaunchPosition,
			casterPosition: castInfo.spellCastLaunchPosition,
			//direction: {
			//    "x": 0.36772018671035767,
			//    "z": 0,
			//    "y": 0.9299365282058716
			//},
			//velocity: {
			//    "x": 441.2642517089844,
			//    "z": -109.0909194946289,
			//    "y": 1115.9239501953125
			//},
			startPoint: castInfo.spellCastLaunchPosition,
			endPoint: castInfo.targetPosition,
			unitPosition: castInfo.spellCastLaunchPosition,
			speed: projectile.speed,
			castInfo: castInfo2,
		});

		owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	/**
	 * @todo make it async ? or make cooldown on slots, not spells
	 */
	waitingCooldown() {
		if (this._cooldownTime > performance.now())
			return true;

		return false;
	}
}
