var Character = require('./Character');


class Player extends Character {
    constructor(playerConfig, playerTeam, playerNum){
        super('PLAYER', playerConfig, playerTeam, playerNum);

    }

}


module.exports = Player;
