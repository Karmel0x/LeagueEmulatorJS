var Unit = require('./Unit');

//const TurretNetIds = {
//    'BLUE': [
//        0x,//
//    ],
//    'RED': [
//    ]
//};

global.Turrets = global.Turrets || {BLUE: {}, RED: {}};

class Turret extends Unit {
    constructor(config, team, num){
        super('TURRET', config, team, num);
        global.Turrets[team][num] = this;

        //this.netId = TurretNetIds[team][num] || 0x00;
    }

}


module.exports = Turret;
