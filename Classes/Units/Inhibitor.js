var Unit = require('./Unit');

const InhibitorNetIds = {
    BLUE: [
        0xFFD23C3E,//4291968062
        0xFF4A20F1,//4283048177
        0xFF9303E1,//4287824865
    ],
    RED: [
        0xFF6793D0,//4284978128
        0xFFFF8F1F,//4294938399
        0xFF26AC0F,//4280724495
    ]
};

global.Inhibitors = global.Inhibitors || {BLUE: {}, RED: {}};

class Inhibitor extends Unit {
    constructor(config, team, num){
        super('INHIBITOR', config, team, num);
        global.Inhibitors[team][num] = this;

        this.netId = InhibitorNetIds[team][num] || 0xFF000000;
    }

}


module.exports = Inhibitor;
