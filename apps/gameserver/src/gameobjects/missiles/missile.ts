
import GameObject, { GameObjectEvents, GameObjectOptions } from '../game-object';
import MovingGameObject, { MovingEvents } from '../extensions/moving/game-object';
import StatsMissile, { StatsMissileOptions } from '../extensions/stats/missile';

import EventEmitter from 'events';
import TypedEventEmitter from 'typed-emitter';
import { IAttackable } from '../extensions/combat/attackable';
import { IDefendable } from '../extensions/combat/defendable';
import Dummytarget from './dummytarget';
import GameObjectList from '../../app/game-object-list';

export type GameTarget = IDefendable | Dummytarget;

export type MissileEvents = GameObjectEvents & MovingEvents & {
	'reachedDest': (target: GameTarget) => void;
}

export type MissileOptions = GameObjectOptions & {
	stats: StatsMissileOptions;
	spawner: IAttackable;
	target: GameTarget;
	windupPercent?: number;
};

/**
 * @abstract
 */
export default class Missile extends GameObject {
	static initialize(options: MissileOptions) {
		return super.initialize(options) as Missile;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<MissileEvents>;

	declare options: MissileOptions;
	spawner;

	declare stats: StatsMissile;
	moving!: MovingGameObject;
	target!: GameTarget;

	get owner() {
		return this.spawner;
	}

	constructor(options: MissileOptions) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;

		super(options);
		this.options = options || {};
		this.spawner = options.spawner;
	}

	loader(options: MissileOptions) {
		options.stats.attackRange = options.stats.attackRange || options.stats.range || 1;
		options.stats.collisionRadius = options.stats.collisionRadius || options.stats.radius || 1;
		options.stats.moveSpeed = options.stats.moveSpeed || options.stats.speed || 1;

		this.stats = new StatsMissile(this, options.stats || {});

		this.moving = new MovingGameObject(this);

		this.target = options.target;

		this.eventEmitter.on('reachedDest', () => {
			this.eventEmitter.emit('destroy');
		});

		super.loader(options);
	}

	/**
	 * @todo move windup somewhere else?
	 */
	async fire(target: GameTarget | number | undefined, windupPercent = 0) {
		if (typeof target === 'number')
			target = GameObjectList.unitByNetId(target);
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
