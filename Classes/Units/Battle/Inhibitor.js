var BattleUnit = require('./Unit');
const { createPacket } = require('../../../Core/PacketUtilities');
const EVENT = require("../../../Packets/EVENT");


class BattleInhibitor extends BattleUnit {

	async onDie(source){
		var ANNOUNCE2 = createPacket('ANNOUNCE2');
		ANNOUNCE2.netId = this.parent.netId;
		ANNOUNCE2.id = EVENT.OnDampenerDie;
		ANNOUNCE2.EventData = {
			OtherNetID: source.parent.netId
		};
		var isSent = global.Teams.ALL.sendPacket(ANNOUNCE2);

		var Building_Die = createPacket('Building_Die');
		Building_Die.netId = this.parent.netId;
		Building_Die.AttackerNetID = source.parent.netId;
		var isSent = global.Teams.ALL.sendPacket(Building_Die);
	}

}


module.exports = BattleInhibitor;
