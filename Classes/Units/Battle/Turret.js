var BattleUnit = require('./Unit');
const { createPacket } = require('../../../PacketUtilities');
const EVENT = require("../../../Packets/EVENT");


class BattleTurret extends BattleUnit {

	async onDie(source){
		var ANNOUNCE2 = createPacket('ANNOUNCE2');
		ANNOUNCE2.netId = this.parent.netId;
		ANNOUNCE2.id = EVENT.OnTurretDie;
		ANNOUNCE2.EventData = {
			OtherNetID: source.parent.netId
		};
		var isSent = global.Teams.ALL.sendPacket(ANNOUNCE2);
		
	}

}


module.exports = BattleTurret;
