
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import Server from '../app/server';
import loadingStages from '../constants/loading-stages';
import Game from '../game/initializers/game';
import { TeamId } from '../gameobjects/extensions/traits/team';
import GameObjectList from '../app/game-object-list';


export default (player: Player, packet: packets.ClientReadyModel) => {
	console.log('handle: c2s.ClientReady');
	//console.log(packet);

	player.network.loadingStage = loadingStages.inGame;

	Game.playerLoaded(player);

	let blueUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id == TeamId.order);
	for (let i = 0, l = blueUnits.length; i < l; i++)
		Server.teams[TeamId.order].vision(blueUnits[i], true);// todo

	let redUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id == TeamId.chaos);
	for (let i = 0, l = redUnits.length; i < l; i++)
		Server.teams[TeamId.chaos].vision(redUnits[i], true);// todo

};
