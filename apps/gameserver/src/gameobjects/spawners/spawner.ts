import GameObject, { GameObjectOptions } from '../game-object';
import Team from '../extensions/traits/team';


export type SpawnerOptions = GameObjectOptions & {
    team: number;
    num?: number;

    info?: {
        name: string;
    };
};

export default class Spawner extends GameObject {
    static initialize(options: SpawnerOptions) {
        return super.initialize(options) as Spawner;
    }

    team;

    constructor(options: SpawnerOptions) {
        super(options);

        this.team = new Team(this, options.team, options.num ?? 0);
    }

}
