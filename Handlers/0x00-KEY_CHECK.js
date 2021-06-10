
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
	console.log('handle: KEY_CHECK');
	{
		var obj1 = q.packet.readobj(Packets.cmd.KEY_CHECK.packet);
		q.packet.off = 0;
		console.log(obj1);
	}
	{
		var KEY_CHECK = createPacket('KEY_CHECK');
		KEY_CHECK.packet.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.packet.ClientID = 1;
		KEY_CHECK.packet.PlayerID = 1;
		var isSent = sendPacket(KEY_CHECK);
	}
	//{
	//	var S2C_WORLD_SEND_GAME_NUMBER = createPacket('S2C_WORLD_SEND_GAME_NUMBER');
	//	//S2C_WORLD_SEND_GAME_NUMBER.packet.netId = Packets.netId;
	//	S2C_WORLD_SEND_GAME_NUMBER.packet.gameId = 1;
	//	S2C_WORLD_SEND_GAME_NUMBER.packet.data = 'Coquinounet';
	//	var isSent = sendPacket(S2C_WORLD_SEND_GAME_NUMBER);
	//}

};
