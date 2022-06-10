
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
	console.log('handle: C2S.World_SendCamera_Server');
	//console.log(packet);

	{
		var World_SendCamera_Server_Acknologment = createPacket('World_SendCamera_Server_Acknologment');
		World_SendCamera_Server_Acknologment.syncId = packet.syncId;
		player.sendPacket(World_SendCamera_Server_Acknologment);
	}
};
