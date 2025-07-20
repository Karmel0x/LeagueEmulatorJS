
import { Vector2, type Vector2Like } from '@repo/geometry';
import GameObjectList from '../app/game-object-list';
import { EventEmitter2 } from '../core/event-emitter2';
import type { StatsGameObjectEvents, StatsGameObjectOptions } from '../gameobjectextensions/stats/game-object';
import StatsGameObject from '../gameobjectextensions/stats/game-object';


export type GameObjectEvents = StatsGameObjectEvents & {
	'spawn': () => void;
	'destroy': () => void;
	'changeOrder': () => void;
}

export type GameObjectOptions = {
	netId?: number;
	spawnPosition?: Vector2Like;
	position?: Vector2Like;
	facePosition?: Vector2Like;
	height?: number;

	stats?: StatsGameObjectOptions;
};

/**
 * This is the basic game object of the game
 * can be extended to units or missiles or anything else that needs to be able to take actions
 * this class should contain only the most basic values
 */
export default class GameObject {
	static initialize(options: GameObjectOptions) {
		const object = new this(options);
		object.loader(options);

		object.eventEmitter.once('spawn', () => {
			GameObjectList.add(object);
		});

		object.eventEmitter.once('destroy', () => {
			GameObjectList.remove(object);
			object.eventEmitter.removeAllListeners();
		});

		return object;
	}

	readonly eventEmitter = new EventEmitter2<GameObjectEvents>();
	netId = 0;
	options;

	readonly spawnPosition = new Vector2(7000, 7000);
	readonly position = new Vector2(7000, 7000);
	height = 0;
	/**
	 * @todo set direction on attack and spell cast
	 */
	readonly direction = new Vector2(1, 0);

	stats!: StatsGameObject;
	ignoreCollision = false;
	spawned = false;

	get facePosition() {
		return this.position.clone().add(this.direction);
	}

	set facePosition(v: Vector2Like) {
		const facing = new Vector2(v.x, v.y);
		facing.sub(this.position).normalize();
		this.direction.copy(facing);
	}

	get type() {
		return this.constructor.name;
	}

	get collisionRadius() {
		return this.stats.collisionRadius.total || 1;
	}

	get pathfindingRadius() {
		return this.stats.pathfindingRadius.total || 1;
	}

	loader(options: GameObjectOptions = {}) {
		this.stats = this.stats || new StatsGameObject(this, options.stats);
	}

	constructor(options: GameObjectOptions) {
		this.options = options;

		this.netId = options.netId || ++GameObjectList.lastNetId;
		//console.log('new GameObject', this, this.netId, GameObjectList.lastNetId);

		const spawnPosition = options.spawnPosition || options.position;
		if (spawnPosition)
			this.spawnPosition = new Vector2(spawnPosition.x, spawnPosition.y);

		const position = options.position || options.spawnPosition;
		if (position)
			this.position = new Vector2(position.x, position.y);

		const facePosition = options.facePosition;
		if (facePosition)
			this.facePosition = new Vector2(facePosition.x, facePosition.y);

		this.height = options.height || 0;
	}

	/**
	 * Get distance from this unit to target unit
	 */
	distanceTo(target: GameObject | Vector2) {
		return this.position.distanceTo((target as GameObject).position || target);
	}

	spawn() {
		if (this.spawned)
			return;

		this.spawned = true;
		this.eventEmitter.emit('spawn');
	}

	waitForSpawn() {
		return new Promise<void>(resolve => {
			if (this.spawned)
				resolve();
			else
				this.eventEmitter.once('spawn', () => resolve());
		});
	}

}
