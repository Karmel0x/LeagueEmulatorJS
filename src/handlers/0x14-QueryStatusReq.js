
const Server = require("../app/Server");
const loadingStages = require("../constants/loadingStages");


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.QueryStatusReq');
	//console.log(packet);

	{
		const QueryStatusAns = Server.network.createPacket('QueryStatusAns');
		QueryStatusAns.response = true;
		player.packets.toSelf(QueryStatusAns, loadingStages.NOT_CONNECTED);
	}
};
