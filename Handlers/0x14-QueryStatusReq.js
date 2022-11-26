
const loadingStages = require("../Constants/loadingStages");


module.exports = (player, packet) => {
    console.log('handle: C2S.QueryStatusReq');
	console.log(packet);
    
	{
		var QueryStatusAns = global.Network.createPacket('QueryStatusAns');
		QueryStatusAns.response = true;
		player.sendTo_self(QueryStatusAns, loadingStages.NOT_CONNECTED);
	}
};
