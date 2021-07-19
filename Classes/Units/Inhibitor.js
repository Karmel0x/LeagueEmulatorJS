var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");

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
//var InhibitorNexus = {
//    _1: 0xffa6170e,
//    _2: 0xff5ec9af,
//    _3: 0xfff02c0f,
//    _4: 0xffe647d5,
//    _5: 0xffff8f1f,
//    _6: 0xff26ac0f,
//    _7: 0xff6793d0,
//    _8: 0xffba00e8,
//
//    //_: 0xfff97db5,
//    //_: 0xffd23c3e,
//    //_: 0xff4a20f1,
//    //_: 0xff9303e1,
//    //_: 0xff10c6db,
//};

global.Inhibitors = global.Inhibitors || {BLUE: {}, RED: {}};

class Inhibitor extends Unit {
    constructor(team, num){
        super('INHIBITOR', {
            netId: InhibitorNetIds[team][num] || 0xFF000000
        }, team, num);
        global.Inhibitors[team][num] = this;

        this.spawn(team, num);
    }
    spawn(team, num){
	    var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
        OBJECT_SPAWN.netId = this.netId;
        OBJECT_SPAWN.isTurret = true;
	    var isSent = global.Teams.ALL.sendPacket(OBJECT_SPAWN);

        super.spawn();
    }
    static spawnAll(){
        for(let team in InhibitorNetIds){
            for(let i = 0; i < 3; i++)
                new Inhibitor(team, i);
        }
    }
}


module.exports = Inhibitor;
