
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';

import Game from '../game/initializers/game';


export default (player: Player, packet: packets.RequestJoinTeamModel) => {
	console.log('handle: loading.RequestJoinTeam');
	//console.log(packet);

	Game.connected(player);
};
