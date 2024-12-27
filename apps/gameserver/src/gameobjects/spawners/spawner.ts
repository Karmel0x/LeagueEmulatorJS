import { EventEmitter2 } from '../../core/event-emitter2';
import Team from '../extensions/traits/team';
import GameObject, { GameObjectOptions, type GameObjectEvents } from '../game-object';


export type SpawnerOptions = GameObjectOptions & {
    name?: string;
    team: number;
};

export type SpawnerEvents = GameObjectEvents & {

};

export default class Spawner extends GameObject {
    static initialize(options: SpawnerOptions) {
        return super.initialize(options) as Spawner;
    }

    readonly eventEmitter = new EventEmitter2<SpawnerEvents>();

    name;
    team;

    constructor(options: SpawnerOptions) {
        super(options);

        this.name = options.name || '';
        this.team = new Team(this, options.team);
    }

}
