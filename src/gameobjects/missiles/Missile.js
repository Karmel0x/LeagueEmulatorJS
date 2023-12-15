
import GameObject from '../GameObject.js';
import UnitList from '../../app/UnitList.js';
import Moving from '../extensions/traits/Moving.js';
import { IStat } from '../extensions/traits/IStat.js';

/**
 * @typedef {import('../../gameobjects/units/Unit.js').default} Unit
 */

/**
 * @abstract
 */
export default class Missile extends GameObject {

	spawner;
	moving;

	/** @type {Object.<string, *>} */
	stats = {};
	target;

	/**
	 * @todo events instead of callbacks?
	 */
	callbacks = {
		move: {},
		collision: {},
	};

	appendGlobal() {

		this.id = UnitList.missilesCount;
		++UnitList.missilesCount;

		UnitList.missiles.push(this);
	}
	removeGlobal() {
		UnitList.missiles.splice(UnitList.missiles.indexOf(this), 1);
	}
	initialize() {
		// override
	}

	get owner() {
		return this.spawner;
	}

	/**
	 * 
	 * @param {import('../GameObjects.js').MissileOptions} options 
	 */
	constructor(options) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		options.stats = options.stats || {};
		options.stats.moveSpeed = new IStat(options.stats.moveSpeed || options.options.speed);
		options.stats.attackRange = new IStat(options.stats.attackRange || options.options.range);
		super(options);
		this.spawner = options.spawner;
		this.stats = options.stats;
		this.moving = new Moving(this);

		this.options = options.options || {};
		this.target = options.target || undefined;
		this.initialize();

		this.appendGlobal();
	}

	destructor() {
		this.removeAllListeners();
		this.removeGlobal();
	}

	/**
	 * @todo move windup somewhere else?
	 * @param {import('../GameObjects.js').GameTarget|number|undefined} target
	 */
	async fire(target, windupPercent = 0) {
		target = typeof target === 'number' ? UnitList.unitsNetId[target] : target;
		if (!target)
			return console.log('Missile.fire:target is not a unit', target);

		//console.debug('Missile.fire', {
		//	owner: {
		//		netId: this.owner.netId,
		//		position: this.owner.position,
		//	},
		//	this: {
		//		netId: this.owner.netId,
		//		position: this.position,
		//	},
		//	target: {
		//		netId: target.netId,
		//		position: target.position,
		//	},
		//});

		if (windupPercent) {
			// https://leagueoflegends.fandom.com/wiki/Basic_attack#Windup
			let windupP = windupPercent / 100;
			let windupModifier = 1;//?

			let bWindupTime = 1 / this.owner.stats.attackSpeed.baseValue;
			let cAttackTime = 1 / this.owner.stats.attackSpeed.total;
			let windup = bWindupTime + ((cAttackTime * windupP) - bWindupTime) * windupModifier;

			//console.debug('Missile.fire:windupCalc', {
			//	windup,
			//	attackSpeed: this.owner.attackSpeed.total,
			//});
			await Promise.wait(windup * 1000);
		}
		this.fly(target);
	}

	/**
	 * Called when the missile reaches its destination (hit the target)
	 * @abstract
	 * @param {import('../GameObjects.js').GameTarget} target 
	 */
	reachedDest(target) {
		// override
		console.log('Missile.reachedDest');
	}

	fulfillRange = 1;

	/**
	 * 
	 * @param {import('../GameObjects.js').GameTarget} target 
	 * @returns 
	 */
	fly(target) {

		if (!this.moving.inRangeOrFollow(this.fulfillRange, target, () => this.reachedDest(target)))
			return false;

		this.reachedDest(target);
	}

}
