
import type GameObject from '../../gameobjects/game-object';
import type { StatsGameObjectOptions } from './game-object';
import StatsGameObject from './game-object';
import { IStat } from './istat';


export type StatsMovableGameObjectOptions = StatsGameObjectOptions & {
	moveSpeed?: number;
};

export default class StatsMovableGameObject extends StatsGameObject {

	moveSpeed: IStat;

	constructor(owner: GameObject, stats: StatsMovableGameObjectOptions = {}) {
		super(owner, stats);

		this.moveSpeed = new IStat(stats.moveSpeed ?? 0);
	}
}
