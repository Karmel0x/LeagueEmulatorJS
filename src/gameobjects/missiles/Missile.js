
const { Vector2 } = require('three');

const ExtendWTraits = require('../../core/ExtendWTraits');
const GameObject = require('../GameObject');
const IMovable = require('../traits/IMovable');
const UnitList = require('../../app/UnitList');
const Server = require('../../app/Server');

/**
 * @typedef {import('../../gameobjects/units/Unit')} Unit
 */

/**
 * @abstract
 */
class Missile extends ExtendWTraits(GameObject, IMovable) {

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
	set owner(value) {
		this.spawner = value;
	}

	/**
	 * 
	 * @param {import('../GameObjects').MissileOptions} options 
	 */
	constructor(options) {
		options.stats = options.stats || {};
		options.stats.moveSpeed = options.stats.moveSpeed || options.options.speed;
		options.stats.attackRange = options.stats.attackRange || options.options.range;
		super(options);

		this.options = options.options || {};
		this.target = options.target || null;
		this.initialize();

		this.appendGlobal();
	}

	destructor() {
		this.removeAllListeners();
		this.removeGlobal();
	}

	/**
	 * @todo move windup somewhere else?
	 */
	async fire(target, windupPercent = 0) {
		target = typeof target == 'number' ? UnitList.unitsNetId[target] : target;
		if (!target)
			return console.log('Missile.fire:target is not a unit', target);

		//console.debug('Missile.fire', {
		//	owner: {
		//		netId: this.owner.netId,
		//		position: this.owner.position,
		//	},
		//	this: {
		//		netId: this.netId,
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

			let bWindupTime = 1 / this.owner.attackSpeed.baseValue;
			let cAttackTime = 1 / this.owner.attackSpeed.total;
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
	 * @param {Unit} target 
	 */
	reachedDest(target) {
		// override
		console.log('Missile.reachedDest');
	}

	fulfillRange = 1;
	fly(target) {

		if (!this.inRangeOrFollow(this.fulfillRange, target, () => this.reachedDest(target)))
			return false;

		this.reachedDest(target);
	}

	/**
	 * @override
	 */
	moveAns() { }
}


module.exports = Missile;
