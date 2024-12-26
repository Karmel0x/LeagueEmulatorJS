
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import loadingStages from '../constants/loading-stages';


export default (player: Player, packet: packets.QueryStatusReqModel) => {
	console.log('handle: c2s.QueryStatusReq');
	//console.log(packet);

	{
		const packet1 = packets.QueryStatusAns.create({
			response: true,
		});

		player.packets.toSelf(packet1, loadingStages.notConnected);
	}
};
