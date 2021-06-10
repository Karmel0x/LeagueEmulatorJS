
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_START_GAME');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_START_GAME.packet);
		q.packet.off = 0;
		console.log(obj1);
	}

    var S2C_START_GAME = createPacket('S2C_START_GAME');
    var isSent = sendPacket(S2C_START_GAME);
    
    {
        var S2C_LOAD_SCREEN_INFO = createPacket('S2C_LOAD_SCREEN_INFO');
        S2C_LOAD_SCREEN_INFO.packet.blueMax = 1;
        S2C_LOAD_SCREEN_INFO.packet.redMax = 0;
        S2C_LOAD_SCREEN_INFO.packet.teamBlue_playerIds = [1];
        S2C_LOAD_SCREEN_INFO.packet.teamRed_playerIds = [];
        S2C_LOAD_SCREEN_INFO.packet.currentBlue = 1;
        S2C_LOAD_SCREEN_INFO.packet.currentRed = 0;
        var isSent = sendPacket(S2C_LOAD_SCREEN_INFO);
    }
};
