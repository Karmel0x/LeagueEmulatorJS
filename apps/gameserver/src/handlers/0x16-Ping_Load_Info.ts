
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import Game from '../game/initializers/game';


export default (player: Player, packet: packets.Ping_Load_InfoModel) => {
	console.log('handle: c2s.Ping_Load_Info');
	//console.log(packet);

	Game.Ping_Load_Info(player, packet);
};
