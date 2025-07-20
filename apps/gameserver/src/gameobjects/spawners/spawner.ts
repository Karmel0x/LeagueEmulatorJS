import { EventEmitter2 } from '../../core/event-emitter2';
import Team from '../../gameobjectextensions/traits/team';
import GameObject, { type GameObjectEvents, type GameObjectOptions } from '../game-object';
import type { AttackableUnitOptions } from '../units/attackable-unit';

export type SpawnConfig<T> = AttackableUnitOptions & { aiOptions?: Omit<T, 'owner'> };

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
