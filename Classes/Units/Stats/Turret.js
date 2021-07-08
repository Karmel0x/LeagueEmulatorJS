var StatsUnit = require('./Unit');


class StatsTurret extends StatsUnit {

    constructor(parent){
        super(parent, {
            sightRange: 1350,
            Range: 750,
            AttackDamage: 750,
            //basicAttackTravelSpeed: 1200,
            //basicAttackFlags: UNBLOCKABLE,
        });
        
    }

}


module.exports = StatsTurret;
