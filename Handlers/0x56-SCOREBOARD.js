
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
	console.log('handle: C2S.SCOREBOARD');
	//console.log(packet);


	//var SCOREBOARD? = createPacket('SCOREBOARD?');
	//var isSent = player.sendPacket(SCOREBOARD?);
	
	//player.loadingStage = true;
};
