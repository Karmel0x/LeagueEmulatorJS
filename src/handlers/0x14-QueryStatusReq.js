
const Server = require("../app/Server");
const loadingStages = require("../constants/loadingStages");


module.exports = (player, packet) => {
	console.log('handle: C2S.QueryStatusReq');
	//console.log(packet);

	{
		var QueryStatusAns = Server.network.createPacket('QueryStatusAns');
		QueryStatusAns.response = true;
		player.sendTo_self(QueryStatusAns, loadingStages.NOT_CONNECTED);
	}
};
