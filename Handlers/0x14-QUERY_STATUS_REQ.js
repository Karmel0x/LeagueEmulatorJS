
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require("../Constants/loadingStages");


module.exports = (player, packet) => {
    console.log('handle: C2S.QUERY_STATUS_REQ');
	//console.log(packet);
    
	{
		var QUERY_STATUS_ANS = createPacket('QUERY_STATUS_ANS');
		QUERY_STATUS_ANS.Response = true;
		player.packetController.sendTo_self(QUERY_STATUS_ANS, loadingStages.NOT_CONNECTED);
	}
};
