
import GameObject, { GameObjectEvents, GameObjectOptions } from '../game-object';
import UnitList from '../../app/unit-list';
import MovingObject from '../extensions/traits/moving-object';
import StatsMissile, { StatsMissileOptions } from '../extensions/stats/missile';

import { MovingUnitEvents } from '../extensions/traits/moving-unit';
import EventEmitter from 'events';
import TypedEventEmitter from 'typed-emitter';
import { IAttackable } from '../extensions/combat/attackable';
import { IDefendable } from '../extensions/combat/defendable';
import Dummytarget from './dummytarget';

export type GameTarget = IDefendable | Dummytarget;

export type MissileEvents = GameObjectEvents & MovingUnitEvents & {
	'reachedDest': (target: GameTarget) => void;
}

export type MissileOptions = GameObjectOptions & {
	stats: StatsMissileOptions;
	spawner: IAttackable;
	target: GameTarget;
};

/**
 * @abstract
 */
export default class Missile extends GameObject {

	eventEmitter = new EventEmitter() as TypedEventEmitter<MissileEvents>;

	spawner;
	moving: MovingObject;

	declare stats: StatsMissile;
	target;
	declare options: MissileOptions;

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

	constructor(options: MissileOptions) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		super(options);
		this.spawner = options.spawner;
		this.stats = new StatsMissile(this, options.stats || {});
		this.moving = new MovingObject(this);

		this.options = options.options || {};
		this.target = options.target || undefined;
		this.initialize();

		this.appendGlobal();
	}

	destructor() {
		this.eventEmitter.removeAllListeners();
		this.removeGlobal();
	}

	/**
	 * @todo move windup somewhere else?
	 */
	async fire(target: GameTarget | number | undefined, windupPercent = 0) {
		if (typeof target === 'number')
			target = UnitList.unitsNetId[target];
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
			await Promise.delay(windup * 1000);
		}
		this.fly(target);
	}

	/**
	 * Called when the missile reaches its destination (hit the target)
	 * @abstract
	 */
	reachedDest(target: GameTarget) {
		console.log('Missile.reachedDest');
		this.eventEmitter.emit('reachedDest', target);
	}

	fulfillRange = 1;

	fly(target: GameTarget) {

		if (!this.moving.inRangeOrFollow(this.fulfillRange, target, () => this.reachedDest(target)))
			return false;

		this.reachedDest(target);
	}

}
