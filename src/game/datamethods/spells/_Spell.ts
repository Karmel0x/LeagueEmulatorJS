
import packets from '../../../packets/index';
import UnitList from '../../../app/UnitList';
import HashString from '../../../functions/HashString';
import SpellCast from './SpellCast';
import Player from '../../../gameobjects/units/Player';
import { SpellData } from '../../../gameobjects/GameObjects';


export default class _Spell {

	owner;
	spellSlot = 255;
	cooldown = 0;
	manaCost = 0;

	windup = 0.05;//?
	castInfo = {};

	static childSpellList: _Spell[] | any[] = [];
	childSpells: _Spell[] | any[] = [];
	parentSpell?: _Spell = undefined;

	isProjectile = false;
	castRange = 25000;
	movingSpell = false;

	_lastCastTime = 0;
	_cooldownTime = 0;

	distanceCalc = 'CENTER_TO_EDGE';

	constructor(options: { owner: Player; parentSpell?: _Spell; }) {
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
		let measure = this.owner.measure[this.distanceCalc];
		let rangeSum = measure.getRangeSum(target, range);
		let isInRange = measure.isInRangeFlat(target, rangeSum);

		if (!isInRange)
			this.owner.moving.moveWithCallback(target, () => this.cast(spellData), rangeSum);

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
		this.owner.emit('spellCastingEnd', spellData);
	}


	async cast(spellData: SpellData) {
		spellData.spell = this;
		spellData.target = spellData.target || undefined;
		spellData.target = typeof spellData.target === 'number' ? UnitList.getUnitByNetId(spellData.target) : spellData.target;
		spellData.movingSpell = this.movingSpell;

		if (!this.preCast(spellData))
			return false;

		if (this.waitingCooldown())
			return false;

		this._lastCastTime = performance.now();
		this._cooldownTime = this._lastCastTime + (this.cooldown * 1000);

		spellData.spellCast = new SpellCast({ spellData });

		this.owner.emit('spellCasting', spellData);
		await Promise.wait(this.windup * 1000);
		this.onCast(spellData);
		await this.afterCast(spellData);

		return true;
	}

	castSpellAns(castInfo: object, packageHash: number) {
		let owner = this.owner;

		const packet1 = new packets.CastSpellAns();
		packet1.netId = owner.netId;
		packet1.casterPositionSyncId = owner.moving?.moveTime || 1;
		packet1.castInfo = {
			spellHash: 0,
			spellCastNetId: 1073743439,
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
		};
		Object.assign(packet1.castInfo, castInfo);

		owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	spawnProjectileAns(castInfo: object, packageHash: number = 0, projectile: object = { speed: 1200 }) {//todo
		let owner = this.owner;

		const packet1 = new packets.MissileReplication();
		packet1.castInfo = {
			spellHash: 0,
			spellCastNetId: 1073743439,
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
		};
		Object.assign(packet1.castInfo, castInfo);
		packet1.netId = packet1.castInfo._netId ?? packet1.castInfo.missileNetId;// ??
		packet1.position = packet1.position || packet1.castInfo.spellCastLaunchPosition;
		packet1.casterPosition = packet1.casterPosition || packet1.castInfo.spellCastLaunchPosition;
		//packet1.direction = {
		//    "x": 0.36772018671035767,
		//    "z": 0,
		//    "y": 0.9299365282058716
		//}
		//packet1.velocity = {
		//    "x": 441.2642517089844,
		//    "z": -109.0909194946289,
		//    "y": 1115.9239501953125
		//};
		packet1.startPoint = packet1.startPoint || packet1.castInfo.spellCastLaunchPosition;
		packet1.endPoint = packet1.endPoint || packet1.castInfo.targetPosition;
		packet1.unitPosition = packet1.unitPosition || packet1.castInfo.spellCastLaunchPosition;
		packet1.speed = projectile.speed;

		owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	waitingCooldown() {
		if (this._cooldownTime > performance.now())
			return true;

		return false;
	}
}
