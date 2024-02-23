
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';

import Game from '../game/initializers/game';


export default (player: Player, packet: packets.RequestJoinTeamModel) => {
	console.log('handle: loading.RequestJoinTeam');
	//console.log(packet);

	Game.connected(player);
};
