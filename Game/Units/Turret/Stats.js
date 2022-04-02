var StatsUnit = require('../Unit/Stats');


class StatsTurret extends StatsUnit {

	constructor(parent){
		super(parent, {
			sightRange: 1350,
			Range: 750,
			AttackDamage: 75,
			//basicAttackTravelSpeed: 1200,
			//basicAttackFlags: UNBLOCKABLE,
			HealthPoints: 4000,
		});
		
	}

}


module.exports = StatsTurret;
