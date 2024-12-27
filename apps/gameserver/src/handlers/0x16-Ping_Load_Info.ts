
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';

import Game from '../game/initializers/game';


export default (player: Player, packet: packets.Ping_Load_InfoModel) => {
	//console.log('handle: c2s.Ping_Load_Info');
	//console.log(packet);

	Game.Ping_Load_Info(player, packet);
};
