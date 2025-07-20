
import type Missile from '../../gameobjects/missiles/missile';
import StatsGameObject, { type StatsGameObjectOptions } from './game-object';
import { IStat } from './istat';


export type StatsMissileOptions = StatsGameObjectOptions & {
	radius?: number;
	attackRange?: number;
	range?: number;
	moveSpeed?: number;
	speed?: number;
};

export default class StatsMissile extends StatsGameObject {

	declare readonly owner: Missile;
	declare base: StatsMissileOptions;

	attackRange: IStat;
	moveSpeed: IStat;

	constructor(owner: Missile, stats: StatsMissileOptions = {}) {
		super(owner, stats);

		this.attackRange = new IStat(stats.attackRange ?? stats.range ?? 175);
		this.moveSpeed = new IStat(stats.moveSpeed ?? stats.speed ?? 325);
	}

}
