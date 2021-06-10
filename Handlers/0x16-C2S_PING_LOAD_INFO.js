
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_PING_LOAD_INFO');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_PING_LOAD_INFO.packet);
		q.packet.off = 0;
		console.log(obj1);

        //if(obj1.ETA == 0){
        //    var S2C_START_GAME = createPacket('S2C_START_GAME');
        //    var isSent = sendPacket(S2C_START_GAME);
        //}
        var S2C_PING_LOAD_INFO = createPacket('S2C_PING_LOAD_INFO');
        S2C_PING_LOAD_INFO.packet.ClientID = obj1.ClientID;
        S2C_PING_LOAD_INFO.packet.PlayerID = 1;
        S2C_PING_LOAD_INFO.packet.Percentage = obj1.Percentage;
        S2C_PING_LOAD_INFO.packet.ETA = obj1.ETA;
        S2C_PING_LOAD_INFO.packet.Count = obj1.Count;
        S2C_PING_LOAD_INFO.packet.Ping = obj1.Ping;
        S2C_PING_LOAD_INFO.packet.Ready_bitField = obj1.Ready_bitField;
        var isSent = sendPacket(S2C_PING_LOAD_INFO);
	}
};
