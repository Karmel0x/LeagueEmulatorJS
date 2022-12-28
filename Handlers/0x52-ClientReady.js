
const loadingStages = require('../Constants/loadingStages');
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.ClientReady');
	//console.log(packet);

	player.loadingStage = loadingStages.IN_GAME;

	Game.playerLoaded(player);

	var blueUnits = global.getUnitsF('BLUE');
	for (var i = 0, l = blueUnits.length; i < l; i++)
		global.Teams['BLUE'].vision(blueUnits[i], true);// todo

	var redUnits = global.getUnitsF('RED');
	for (var i = 0, l = redUnits.length; i < l; i++)
		global.Teams['RED'].vision(redUnits[i], true);// todo

};
