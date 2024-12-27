
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';

import loadingStages from '../constants/game-state';


export default (player: Player, packet: packets.QueryStatusReqModel) => {
	console.log('handle: c2s.QueryStatusReq');
	//console.log(packet);

	{
		const packet1 = packets.QueryStatusAns.create({
			response: true,
		});

		player.owner.packets.toSelf(packet1, loadingStages.notConnected);
	}
};
