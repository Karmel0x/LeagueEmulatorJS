
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.SpectatorDataReqModel) => {
	console.log('handle: c2s.SpectatorDataReq');
	//console.log(packet);


};
