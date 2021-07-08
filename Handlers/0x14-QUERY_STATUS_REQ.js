
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.QUERY_STATUS_REQ');
	//console.log(packet);
    

	var QUERY_STATUS_ANS = createPacket('QUERY_STATUS_ANS');
    QUERY_STATUS_ANS.ok = true;
	var isSent = player.sendPacket(QUERY_STATUS_ANS);
};
