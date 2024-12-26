
import type GameObject from '../../game-object';
import { IStat, IStatLevelable, IStatStateable } from './istat';

export type StatsGameObjectEvents = {
	'changeStats': () => void;
}

export type StatsGameObjectOptions = {
	collisionRadius?: number;
};

export default class StatsGameObject {

	owner: GameObject;
	base: StatsGameObjectOptions;

	collisionRadius: IStat;

	constructor(owner: GameObject, stats: StatsGameObjectOptions = {}) {
		this.owner = owner;
		this.base = stats;

		this.collisionRadius = new IStat(stats.collisionRadius || 1);

		owner.eventEmitter.once('initialized', () => {
			this.owner.eventEmitter.emit('changeStats');
		});
	}

	increase(stats: { [s: string]: IStat; }) {
		let _this = this as unknown as { [stat: string]: IStat | IStatLevelable | IStatStateable };
		Object.keys(stats).forEach(name => {
			let s = stats[name];
			let t = _this[name];

			if (s.flatBonus)
				t.flatBonus += s.flatBonus;

			if (s.percentBonus)
				t.percentBonus += s.percentBonus;
		});
		this.owner.eventEmitter.emit('changeStats');
	}

	decrease(stats: { [s: string]: IStat; }) {
		let _this = this as unknown as { [stat: string]: IStat | IStatLevelable | IStatStateable };
		Object.keys(stats).forEach(name => {
			let s = stats[name];
			let t = _this[name];

			if (s.flatBonus)
				t.flatBonus -= s.flatBonus;

			if (s.percentBonus)
				t.percentBonus -= s.percentBonus;
		});
		this.owner.eventEmitter.emit('changeStats');
	}

	/**
	 * Friendly funtion to add stats to the unit and holding decrease function
	 * call this() to decrease stats
	 */
	temporary(stats: { [s: string]: IStat; }) {
		this.increase(stats);
		return () => this.decrease(stats);
	}
}
