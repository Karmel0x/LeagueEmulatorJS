
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require('../Constants/loadingStages');
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.ClientReady');
	//console.log(packet);

	player.loadingStage = loadingStages.IN_GAME;

	Game.playerLoaded(player);

	var blueUnits = global.getUnitsF('BLUE');
	for(var allyUnit_id in blueUnits)
		global.Teams['BLUE'].vision(blueUnits[allyUnit_id], true);// todo

	var redUnits = global.getUnitsF('RED');
	for(var allyUnit_id in redUnits)
		global.Teams['RED'].vision(redUnits[allyUnit_id], true);// todo

};
