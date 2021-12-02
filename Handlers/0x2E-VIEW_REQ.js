
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
	console.log('handle: C2S.VIEW_REQ');
	//console.log(packet);

	var VIEW_ANS = createPacket('VIEW_ANS');
	VIEW_ANS.SyncID = packet.SyncID;
	var isSent = player.sendPacket(VIEW_ANS);
	
};
