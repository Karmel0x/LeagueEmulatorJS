
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';

import Server from '../app/server';
import UnitList from '../app/unit-list';
import loadingStages from '../constants/loading-stages';
import Game from '../game/initializers/game';
import Team, { TeamId } from '../gameobjects/extensions/traits/team';


export default (player: Player, packet: packets.ClientReadyModel) => {
	console.log('handle: c2s.ClientReady');
	//console.log(packet);

	player.network.loadingStage = loadingStages.inGame;

	Game.playerLoaded(player);

	let blueUnits = UnitList.getUnitsF(TeamId.order);
	for (let i = 0, l = blueUnits.length; i < l; i++)
		Server.teams[TeamId.order].vision(blueUnits[i], true);// todo

	let redUnits = UnitList.getUnitsF(TeamId.chaos);
	for (let i = 0, l = redUnits.length; i < l; i++)
		Server.teams[TeamId.chaos].vision(redUnits[i], true);// todo

};
