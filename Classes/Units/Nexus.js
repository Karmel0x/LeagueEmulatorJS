var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");

const NexusNetIds = {
    BLUE: 0xFFF97DB5,//4294540725
    RED: 0xFFF02C0F,//4293929999
};


class Nexus extends Unit {
    //onDie(){
    //    //end game?
    //}
    spawn(){
	    var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
        OBJECT_SPAWN.netId = this.netId;
        OBJECT_SPAWN.isTurret = true;
	    var isSent = global.Teams.ALL.sendPacket(OBJECT_SPAWN);

        super.spawn();
    }
    static spawnAll(){
        for(let team in NexusNetIds)
            new Nexus(team, 0, '', {netId: NexusNetIds[team] || 0xFFF00000});
    }
}


module.exports = Nexus;
