var BattleUnit = require('./Unit');
const { createPacket } = require('../../../Core/PacketUtilities');


class BattleNexus extends BattleUnit {

	async onDie(source){
		var Building_Die = createPacket('Building_Die');
		Building_Die.netId = this.parent.netId;
		Building_Die.AttackerNetID = source.netId;
		this.parent.packetController.sendTo_everyone(Building_Die);
	}

}


module.exports = BattleNexus;
