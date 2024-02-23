import GameObject, { GameObjectOptions } from '../game-object';
import Team from '../extensions/traits/team';
import type Barrack from './barrack';
import type JungleCamp from './jungle-camp';
import type Fountain from './fountain';


export type UnitSpawner = Barrack | JungleCamp | Fountain;

export type SpawnerOptions = GameObjectOptions & {
    team: number;
    num?: number;
};

export default class Spawner extends GameObject {
    team;

    constructor(options: SpawnerOptions) {
        super(options);

        this.team = new Team(this, options.team, options.num);
    }

}
