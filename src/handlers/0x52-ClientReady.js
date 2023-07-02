
const Server = require('../app/Server');
const UnitList = require('../app/UnitList');
const loadingStages = require('../constants/loadingStages');
const Game = require('../game/initializers/Game');
const Team = require('../gameobjects/extensions/traits/Team');


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.ClientReady');
	//console.log(packet);

	player.network.loadingStage = loadingStages.IN_GAME;

	Game.playerLoaded(player);

	let blueUnits = UnitList.getUnitsF(Team.TEAM_BLUE);
	for (let i = 0, l = blueUnits.length; i < l; i++)
		Server.teams[Team.TEAM_BLUE].vision(blueUnits[i], true);// todo

	let redUnits = UnitList.getUnitsF(Team.TEAM_RED);
	for (let i = 0, l = redUnits.length; i < l; i++)
		Server.teams[Team.TEAM_RED].vision(redUnits[i], true);// todo

};
