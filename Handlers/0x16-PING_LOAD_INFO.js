
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
const loadingStages = require("../Constants/loadingStages");


module.exports = (player, packet) => {
	console.log('handle: C2S.PING_LOAD_INFO');
	//console.log(packet);

	{
		var PING_LOAD_INFO = createPacket('PING_LOAD_INFO', 'LOW_PRIORITY');
		PING_LOAD_INFO.ClientID = packet.ClientID;
		PING_LOAD_INFO.PlayerID = 1;
		PING_LOAD_INFO.Percentage = packet.Percentage;
		PING_LOAD_INFO.ETA = packet.ETA;
		PING_LOAD_INFO.Count = packet.Count;
		PING_LOAD_INFO.Ping = packet.Ping;
		PING_LOAD_INFO.bitField = {
			Ready: packet.bitfield.Ready,
		};
		var isSent = player.sendPacket(PING_LOAD_INFO, loadingStages.NOT_CONNECTED);
	}
};
