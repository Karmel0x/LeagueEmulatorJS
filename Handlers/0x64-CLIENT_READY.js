
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: LOADING_SCREEN.CLIENT_READY');
	//console.log(packet);

    
    {
        var LOAD_SCREEN_INFO = createPacket('LOAD_SCREEN_INFO', 'LOADING_SCREEN');
        LOAD_SCREEN_INFO.blueMax = 6;
        LOAD_SCREEN_INFO.redMax = 6;
        LOAD_SCREEN_INFO.teamBlue_playerIds = [1];
        LOAD_SCREEN_INFO.teamRed_playerIds = [];
        LOAD_SCREEN_INFO.currentBlue = 1;
        LOAD_SCREEN_INFO.currentRed = 0;
        var isSent = player.sendPacket(LOAD_SCREEN_INFO);
    }
    {
        var LOAD_NAME = createPacket('LOAD_NAME', 'LOADING_SCREEN');
        LOAD_NAME.PlayerId = 1;
        LOAD_NAME.SkinId = 0;
        LOAD_NAME.playerName = 'Test';
        var isSent = player.sendPacket(LOAD_NAME);
    }
    {
        var LOAD_HERO = createPacket('LOAD_HERO', 'LOADING_SCREEN');
        LOAD_HERO.PlayerId = 1;
        LOAD_HERO.SkinId = 0;
        LOAD_HERO.SkinName = 'Ezreal';
        var isSent = player.sendPacket(LOAD_HERO);
    }

};
