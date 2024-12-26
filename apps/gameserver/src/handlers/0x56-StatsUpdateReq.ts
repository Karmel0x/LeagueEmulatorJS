
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.StatsUpdateReqModel) => {
	console.log('handle: c2s.StatsUpdateReq');
	//console.log(packet);


	//const packet1 = packets.StatsUpdateReq?.create({});
	//player.network.sendPacket(packet1?);

	//player.network.loadingStage = true;
};
