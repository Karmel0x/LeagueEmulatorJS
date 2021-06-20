var Unit = require('./Unit');


global.Nexuses = global.Nexuses || {};

class Nexus extends Unit {
    constructor(config, team){
        super('NEXUS', config, team, 0);
        global.Nexuses[team] = this;

    }

}


module.exports = Nexus;
