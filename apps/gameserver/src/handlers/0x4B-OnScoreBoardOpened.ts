
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.OnScoreBoardOpenedModel) => {
	console.log('handle: c2s.OnScoreBoardOpened');
	//console.log(packet);


};
