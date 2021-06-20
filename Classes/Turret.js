var Unit = require('./Unit');


global.Turrets = global.Turrets || {BLUE: {}, RED: {}};

class Turret extends Unit {
    constructor(config, team, num){
        super('TURRET', config, team, num);
        global.Turrets[team][num] = this;

    }

}


module.exports = Turret;
