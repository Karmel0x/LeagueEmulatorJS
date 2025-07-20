
import type GameObject from '../../gameobjects/game-object';
import { IStat } from './istat';

export type StatsGameObjectEvents = {
	//'changeStats': () => void;
}

export type StatsGameObjectOptions = {
	collisionRadius?: number;
	pathfindingRadius?: number;
};

export default class StatsGameObject {

	readonly owner: GameObject;
	base: StatsGameObjectOptions;

	collisionRadius: IStat;
	pathfindingRadius: IStat;

	constructor(owner: GameObject, stats: StatsGameObjectOptions = {}) {
		this.owner = owner;
		this.base = stats;

		this.collisionRadius = new IStat(stats.collisionRadius ?? 1);
		this.pathfindingRadius = new IStat(stats.pathfindingRadius ?? 1);
	}

	//increase(stats: { [s: string]: IStat; }) {
	//	const _this = this as unknown as { [stat: string]: IStat | IStatLevelable | IStatStateable };
	//	Object.keys(stats).forEach(name => {
	//		const s = stats[name]!;
	//		const t = _this[name]!;
	//
	//		if (s.flatBonus)
	//			t.flatBonus += s.flatBonus;
	//
	//		if (s.percentBonus)
	//			t.percentBonus += s.percentBonus;
	//	});
	//	this.owner.eventEmitter.emit('changeStats');
	//}
	//
	//decrease(stats: { [s: string]: IStat; }) {
	//	const _this = this as unknown as { [stat: string]: IStat | IStatLevelable | IStatStateable };
	//	Object.keys(stats).forEach(name => {
	//		const s = stats[name]!;
	//		const t = _this[name]!;
	//
	//		if (s.flatBonus)
	//			t.flatBonus -= s.flatBonus;
	//
	//		if (s.percentBonus)
	//			t.percentBonus -= s.percentBonus;
	//	});
	//	this.owner.eventEmitter.emit('changeStats');
	//}
	//
	///**
	// * Friendly funtion to add stats to the unit and holding decrease function
	// * call this() to decrease stats
	// */
	//temporary(stats: { [s: string]: IStat; }) {
	//	this.increase(stats);
	//	return () => this.decrease(stats);
	//}
}
