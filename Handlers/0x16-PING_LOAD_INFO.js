
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.PING_LOAD_INFO');
	console.log(obj1);

	{
        //if(obj1.ETA == 0){
        //    var START_GAME = createPacket('START_GAME');
        //    var isSent = sendPacket(START_GAME);
        //}
        var PING_LOAD_INFO = createPacket('PING_LOAD_INFO');
        PING_LOAD_INFO.ClientID = obj1.ClientID;
        PING_LOAD_INFO.PlayerID = 1;
        PING_LOAD_INFO.Percentage = obj1.Percentage;
        PING_LOAD_INFO.ETA = obj1.ETA;
        PING_LOAD_INFO.Count = obj1.Count;
        PING_LOAD_INFO.Ping = obj1.Ping;
        PING_LOAD_INFO.Ready_bitField = obj1.Ready_bitField;
        var isSent = sendPacket(PING_LOAD_INFO);
	}
};
