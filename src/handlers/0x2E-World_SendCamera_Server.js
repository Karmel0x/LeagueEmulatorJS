const Server = require("../app/Server");

/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	//console.log('handle: C2S.World_SendCamera_Server');
	//console.log(packet);

	{
		const World_SendCamera_Server_Acknologment = Server.network.createPacket('World_SendCamera_Server_Acknologment');
		World_SendCamera_Server_Acknologment.syncId = packet.syncId;
		player.network.sendPacket(World_SendCamera_Server_Acknologment);
	}
};
