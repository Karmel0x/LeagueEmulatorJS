
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_CLIENT_READY');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_CLIENT_READY.packet);
		q.packet.off = 0;
		console.log(obj1);
	}
    
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
    {
        var S2C_LOAD_NAME = createPacket('S2C_LOAD_NAME');
        S2C_LOAD_NAME.packet.PlayerId = 1;
        S2C_LOAD_NAME.packet.SkinId = 0;
        S2C_LOAD_NAME.packet.playerName = 'Nautilus';
        var isSent = sendPacket(S2C_LOAD_NAME);
    }
    {
        var S2C_LOAD_HERO = createPacket('S2C_LOAD_HERO');
        S2C_LOAD_HERO.packet.PlayerId = 1;
        S2C_LOAD_HERO.packet.SkinId = 0;
        S2C_LOAD_HERO.packet.SkinName = 'Nautilus';
        var isSent = sendPacket(S2C_LOAD_HERO);
    }

};
