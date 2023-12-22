
import Server from '../app/Server';
import UnitList from '../app/UnitList';
import loadingStages from '../constants/loadingStages';
import Game from '../game/initializers/Game';
import Team from '../gameobjects/extensions/traits/Team';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x52-ClientReady.js').struct} packet 
 */
export default (player, packet) => {
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
