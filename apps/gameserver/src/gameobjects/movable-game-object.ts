
import { EventEmitter2 } from '../core/event-emitter2';
import MovingGameObject, { MovingEvents } from './extensions/moving/game-object';
import StatsMovableGameObject from './extensions/stats/movable-game-object';
import GameObject, { GameObjectEvents, GameObjectOptions } from './game-object';


export type MovableGameObjectEvents = GameObjectEvents & MovingEvents & {

}

export type MovableGameObjectOptions = GameObjectOptions & {

};

export default class MovableGameObject extends GameObject {

	readonly eventEmitter = new EventEmitter2<MovableGameObjectEvents>();

	declare stats: StatsMovableGameObject;
	moving!: MovingGameObject;

	//constructor(options: GameObjectOptions) {
	//	super(options);
	//}

	loader(options: MovableGameObjectOptions) {
		this.stats = this.stats || new StatsMovableGameObject(this, options.stats);
		this.moving = new MovingGameObject(this);

		super.loader(options);
	}

}
