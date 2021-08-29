var BattleUnit = require('./Unit');
const {createPacket, sendPacket} = require("../../../PacketUtilities");


class BattleTurret extends BattleUnit {

	async onDie(source){
		
	}

}


module.exports = BattleTurret;
