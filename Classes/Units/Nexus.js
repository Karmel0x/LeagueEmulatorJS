var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");
const loadingStages = require("../../Constants/loadingStages");

const NexusNetIds = {
    BLUE: 0xFFF97DB5,//4294540725
    RED: 0xFFF02C0F,//4293929999
};


class Nexus extends Unit {
    constructor(team, num = 0, character = '', config = {}){
        super(team, num, character, config);

        this.initialized();
    }
    //onDie(){
    //    //end game?
    //}
    spawn(){
	    var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
        OBJECT_SPAWN.netId = this.netId;
        OBJECT_SPAWN.isTurret = true;
	    var isSent = global.Teams.ALL.sendPacket(OBJECT_SPAWN, loadingStages.NOT_CONNECTED);

        super.spawn();
    }
    static spawnAll(){
        for(let team in NexusNetIds)
            new Nexus(team, 0, '', {netId: NexusNetIds[team] || 0xFFF00000});
    }
    SET_HEALTH(){
        var SET_HEALTH = createPacket('SET_HEALTH');
        SET_HEALTH.netId = this.netId;
        SET_HEALTH.count = 0;
		SET_HEALTH.MaxHealth = this.stats.HealthPoints.Total;
		SET_HEALTH.Health = this.stats.CurrentHealth;
        var isSent = global.Teams.ALL.sendPacket(SET_HEALTH, loadingStages.NOT_CONNECTED);
    }
}


module.exports = Nexus;
