import GameObject from '../GameObject';
import { SpawnerOptions } from '../GameObjects';
import Team from '../extensions/traits/Team';


class Spawner extends GameObject {
    team;

    constructor(options: SpawnerOptions) {
        super(options);

        this.team = new Team(this, options.team, options.num);
    }

}

export default Spawner;
