
const Server = require('../app/Server');
const UnitList = require('../app/UnitList');
const loadingStages = require('../constants/loadingStages');
const Game = require('../game/initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.ClientReady');
	//console.log(packet);

	player.loadingStage = loadingStages.IN_GAME;

	Game.playerLoaded(player);

	var blueUnits = UnitList.getUnitsF('BLUE');
	for (var i = 0, l = blueUnits.length; i < l; i++)
		Server.teams['BLUE'].vision(blueUnits[i], true);// todo

	var redUnits = UnitList.getUnitsF('RED');
	for (var i = 0, l = redUnits.length; i < l; i++)
		Server.teams['RED'].vision(redUnits[i], true);// todo

};
