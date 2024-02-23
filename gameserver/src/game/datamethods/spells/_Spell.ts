
import * as packets from '@workspace/packets/packages/packets';
import UnitList from '../../../app/unit-list';
import HashString from '@workspace/packets/packages/packets/functions/hash-string';
import SpellCast from './spell-cast';
import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';
import { IDefendable } from '../../../gameobjects/extensions/combat/defendable';
import * as Measure from '../../../gameobjects/extensions/measure';
import { ISpellable } from '../../../gameobjects/extensions/combat/spellable';


export type SpellData = {
	packet: Object;
	spell?: _Spell;
	target?: IDefendable | number;
	movingSpell?: boolean;
	spellCast?: SpellCast;
};

export type SpellOptions = {
	owner: ISpellable;
	parentSpell?: _Spell;
};

export default class _Spell {

	owner;
	spellSlot = 255;
	cooldown = 0;
	manaCost = 0;

	windup = 0.05;//?
	castInfo: Partial<SCastInfoModel> = {};

	static childSpellList: _Spell[] | any[] = [];
	childSpells: _Spell[] | any[] = [];
	parentSpell?: _Spell = undefined;

	isProjectile = false;
	castRange = 25000;
	movingSpell = false;

	_lastCastTime = 0;
	_cooldownTime = 0;

	measure = Measure.centerToCenter;

	constructor(options: SpellOptions) {
		this.owner = options.owner || null;

		this.parentSpell = options.parentSpell || undefined;
		this.spellHash = HashString.HashString(this.constructor.name);

		this.constructor.childSpellList.forEach(spell => {
			this.childSpells.push(new spell({ ...options, parentSpell: this }));
		});
	}


	/**
	 * @abstract
	 */
	preCast(spellData: SpellData) {
		let target = spellData.target || spellData.packet;

		let range = this.castRange;
		let rangeSum = this.measure.getRangeSum(this.owner, target, range);
		let isInRange = this.measure.isInRangeFlat(this.owner, target, rangeSum);

		if (!isInRange)
			this.owner.moving?.moveWithCallback(target, () => this.cast(spellData), rangeSum);

		return isInRange;
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
		if (this.isProjectile)
			this.spawnProjectileAns(spellData.spellCast.castInfo, 0, this.projectileData);
		else
			this.castSpellAns(spellData.spellCast.castInfo);

		//console.log('afterCast', spellData);
		let l = this.childSpells.length;
		if (l > 0) {
			for (let i = 0; i < l; i++)
				await this.childSpells[i].cast(spellData);

			return;
		}
		this.owner.eventEmitter.emit('spellCastingEnd', spellData);
	}


	async cast(spellData: SpellData) {
		spellData.spell = this;
		spellData.target = spellData.target || undefined;
		if (typeof spellData.target === 'number')
			spellData.target = UnitList.getUnitByNetId(spellData.target);
		spellData.movingSpell = this.movingSpell;

		if (!this.preCast(spellData))
			return false;

		if (this.waitingCooldown())
			return false;

		this._lastCastTime = performance.now();
		this._cooldownTime = this._lastCastTime + (this.cooldown * 1000);

		spellData.spellCast = new SpellCast({ spellData });

		this.owner.eventEmitter.emit('spellCasting', spellData);
		await Promise.delay(this.windup * 1000);
		this.onCast(spellData);
		await this.afterCast(spellData);

		return true;
	}

	castSpellAns(castInfo: Partial<SCastInfoModel>, packageHash: number) {
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
				targetPosition: {},
				targetPositionEnd: {},
				designerCastTime: 0.25,
				designerTotalTime: 0.25,
				manaCost: 28,
				spellCastLaunchPosition: {
					x: owner.position.x,
					y: owner.position.y,
					z: 0,
				},
				ammoUsed: 1,
				target: [{
					unit: 0,
					hitResult: 0,
				}],
				...castInfo,
			},
		});

		owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	spawnProjectileAns(castInfo: Partial<SCastInfoModel>, packageHash: number = 0, projectile: object = { speed: 1200 }) {//todo
		let owner = this.owner;

		castInfo = {
			spellHash: 0,
			castNetId: 1073743439,
			spellLevel: 1,
			attackSpeedModifier: 1,
			casterNetId: owner.netId,
			spellChainOwnerNetId: owner.netId,
			packageHash: packageHash,
			missileNetId: 1073743440,
			targetPosition: {},
			targetPositionEnd: {},
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
		};

		const packet1 = packets.MissileReplication.create({
			netId: castInfo._netId ?? castInfo.missileNetId,// ??
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
			castInfo,
		});

		owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	waitingCooldown() {
		if (this._cooldownTime > performance.now())
			return true;

		return false;
	}
}
