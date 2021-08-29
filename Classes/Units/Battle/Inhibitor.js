var BattleUnit = require('./Unit');
const {createPacket, sendPacket} = require("../../../PacketUtilities");


class BattleInhibitor extends BattleUnit {

	async onDie(source){
        var Building_Die = createPacket('Building_Die');
        Building_Die.netId = this.parent.netId;
        Building_Die.AttackerNetID = source.netId;
        var isSent = global.Teams.ALL.sendPacket(Building_Die);
	}

}


module.exports = BattleInhibitor;
