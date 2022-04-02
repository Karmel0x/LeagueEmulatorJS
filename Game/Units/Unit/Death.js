var ConstantsUnit = require('../../../Constants/Unit');


class DeathUnit {

	constructor(parent){
		this.parent = parent;

		this.respawnTime = ConstantsUnit[this.parent.info.type]?.respawnTime || false;
	}

	respawnTime = 0;
	totalRespawnTime = 0;
	Exp = 0;
	Gold = 0;
	
}


module.exports = DeathUnit;
