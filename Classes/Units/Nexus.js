var Unit = require('./Unit');

const NexusNetIds = {
    BLUE: 0xFFF97DB5,//4294540725
    RED: 0xFFF02C0F,//4293929999
};

global.Nexuses = global.Nexuses || {};

class Nexus extends Unit {
    constructor(config, team){
        super('NEXUS', config, team, 0);
        global.Nexuses[team] = this;

        this.netId = NexusNetIds[team] || 0xFFF00000;
    }

}


module.exports = Nexus;
