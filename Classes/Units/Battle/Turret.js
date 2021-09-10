var BattleUnit = require('./Unit');
const { createPacket } = require('../../../PacketUtilities');
const pANNOUNCE2 = require("../../../Packets/S2C/0xA3-ANNOUNCE2");


class BattleTurret extends BattleUnit {

	async onDie(source){
		var ANNOUNCE2 = createPacket('ANNOUNCE2');
		ANNOUNCE2.netId = this.parent.netId;
		ANNOUNCE2.id = pANNOUNCE2.ids.TURRET_DESTROYED;
		ANNOUNCE2.killerNetId = source.parent.netId;
		var isSent = global.Teams.ALL.sendPacket(ANNOUNCE2);
		
	}

}


module.exports = BattleTurret;
