
import { EventEmitter } from 'node:events';
import { Vector2 } from 'three';
import UnitList from '../app/UnitList';
import Measure from './extensions/Measure/index';
import { GameObjectOptions } from './GameObjects';


/**
 * This is the basic game object of the game
 * can be extended to units or missiles or anything else that needs to be able to take actions
 * this class should contain only the most basic values
 */
export default class GameObject extends EventEmitter {

	netId = 0;
	options;

	position = new Vector2(7000, 7000);
	spawnPosition = new Vector2(7000, 7000);
	measure;

	get type() {
		return this.constructor.name;
	}

	get collisionRadius() {
		return this.stats?.collisionRadius || 1;
	}

	constructor(options: GameObjectOptions) {
		super();
		this.options = options;

		this.netId = options.netId || ++UnitList.lastNetId;
		//console.log('new GameObject', this, this.netId, UnitList.lastNetId);

		let spawnPosition = options.spawnPosition || options.position;
		if (spawnPosition)
			this.spawnPosition = new Vector2(spawnPosition.x, spawnPosition.y);

		let position = options.position || options.spawnPosition;
		if (position)
			this.position = new Vector2(position.x, position.y);

		this.measure = new Measure(this);
	}

	/**
	 * Get distance from this unit to target unit
	 */
	distanceTo(target: GameObject | Vector2) {
		return this.position.distanceTo(target.position || target);
	}

}
