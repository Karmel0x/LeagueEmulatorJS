const loadingStages = require("../../../Constants/loadingStages");

module.exports = class PacketController {
	constructor(parent){
		this.parent = parent;

	}

	sendTo_self(packet, minStage = loadingStages.IN_GAME){
		this.parent.sendPacket(packet, minStage);
	}
	sendTo_everyone(packet, minStage = loadingStages.IN_GAME){
		global.Teams.ALL.sendPacket(packet, minStage);
	}
	sendTo_vision(packet, minStage = loadingStages.IN_GAME){
		global.Teams.ALL.sendPacket_withVision(packet, minStage);
	}
	sendTo_team(packet, minStage = loadingStages.IN_GAME){
		global.Teams[this.parent.team].sendPacket(packet, minStage);
	}
	sendTo_loading(packet){
		//global.Teams.ALL.sendPacket(packet, loadingStages.LOADING);
		global.Teams.ALL.sendPacket(packet, loadingStages.NOT_CONNECTED);
	}
};
