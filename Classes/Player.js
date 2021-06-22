var Unit = require('./Unit');


global.Players = global.Players || {};

class Player extends Unit {
    constructor(config, team, num){
        super('PLAYER', config, team, num);
        global.Players[num] = this;

        this.loaded = false;
        this.unit.spawnNum = 5;
        this.netId = 0x400005ed;
    }

    getRespawnTime(){
        return 10;
    }
}


module.exports = Player;
