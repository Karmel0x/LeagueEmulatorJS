const GameObject = require("../GameObject");
const Team = require("../extensions/traits/Team");


class Spawner extends GameObject {
    team;

    constructor(options) {
        super(options);

        this.team = new Team(this, options.team, options.num);
    }

}

module.exports = Spawner;
