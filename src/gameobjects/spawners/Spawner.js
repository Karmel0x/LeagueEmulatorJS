import GameObject from '../GameObject.js';
import Team from '../extensions/traits/Team.js';


class Spawner extends GameObject {
    team;

    /**
     * 
     * @param {import('../GameObjects.js').SpawnerOptions} options 
     */
    constructor(options) {
        super(options);

        this.team = new Team(this, options.team, options.num);
    }

}

export default Spawner;
