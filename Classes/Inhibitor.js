var Unit = require('./Unit');


global.Inhibitors = global.Inhibitors || {BLUE: {}, RED: {}};

class Inhibitor extends Unit {
    constructor(config, team, num){
        super('INHIBITOR', config, team, num);
        global.Inhibitors[team][num] = this;

    }

}


module.exports = Inhibitor;
