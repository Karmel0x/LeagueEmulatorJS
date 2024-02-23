
import { EventEmitter } from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import { Vector2 } from 'three';
import UnitList from '../app/unit-list';
import type { StatsGameObjectEvents, StatsGameObjectOptions } from './extensions/stats/game-object';
import StatsGameObject from './extensions/stats/game-object';


export type GameObjectEvents = StatsGameObjectEvents & {
	'initialized': () => void;
}

export type GameObjectOptions = {
	netId?: number;
	spawnPosition?: Vector2 | { x: number, y: number };
	position?: Vector2 | { x: number, y: number };

	stats?: StatsGameObjectOptions;
};

/**
 * This is the basic game object of the game
 * can be extended to units or missiles or anything else that needs to be able to take actions
 * this class should contain only the most basic values
 */
export default class GameObject {

	netId = 0;
	options;
	eventEmitter = new EventEmitter() as TypedEventEmitter<GameObjectEvents>;

	position = new Vector2(7000, 7000);
	spawnPosition = new Vector2(7000, 7000);
	stats!: StatsGameObject;

	get type() {
		return this.constructor.name;
	}

	get collisionRadius() {
		return this.stats.collisionRadius.total || 1;
	}

	loader(options: GameObjectOptions = {}) {
		this.stats = this.stats || new StatsGameObject(this, options.stats);
	}

	constructor(options: GameObjectOptions) {
		this.options = options;

		this.netId = options.netId || ++UnitList.lastNetId;
		//console.log('new GameObject', this, this.netId, UnitList.lastNetId);

		let spawnPosition = options.spawnPosition || options.position;
		if (spawnPosition)
			this.spawnPosition = new Vector2(spawnPosition.x, spawnPosition.y);

		let position = options.position || options.spawnPosition;
		if (position)
			this.position = new Vector2(position.x, position.y);

	}

	/**
	 * Get distance from this unit to target unit
	 */
	distanceTo(target: GameObject | Vector2) {
		return this.position.distanceTo((target as GameObject).position || target);
	}

}
