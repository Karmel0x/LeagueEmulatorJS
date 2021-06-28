
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.CLIENT_READY');// loading screen
	console.log(obj1);

    
    {
        var LOAD_SCREEN_INFO = createPacket('LOAD_SCREEN_INFO', 'LOADING_SCREEN');
        LOAD_SCREEN_INFO.packet.blueMax = 6;
        LOAD_SCREEN_INFO.packet.redMax = 6;
        LOAD_SCREEN_INFO.packet.teamBlue_playerIds = [1];
        LOAD_SCREEN_INFO.packet.teamRed_playerIds = [];
        LOAD_SCREEN_INFO.packet.currentBlue = 1;
        LOAD_SCREEN_INFO.packet.currentRed = 0;
        var isSent = sendPacket(LOAD_SCREEN_INFO);
    }
    {
        var LOAD_NAME = createPacket('LOAD_NAME', 'LOADING_SCREEN');
        LOAD_NAME.packet.PlayerId = 1;
        LOAD_NAME.packet.SkinId = 0;
        LOAD_NAME.packet.playerName = 'Test';
        var isSent = sendPacket(LOAD_NAME);
    }
    {
        var LOAD_HERO = createPacket('LOAD_HERO', 'LOADING_SCREEN');
        LOAD_HERO.packet.PlayerId = 1;
        LOAD_HERO.packet.SkinId = 0;
        LOAD_HERO.packet.SkinName = 'Ezreal';
        var isSent = sendPacket(LOAD_HERO);
    }

};
