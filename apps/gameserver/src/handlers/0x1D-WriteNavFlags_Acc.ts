
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.WriteNavFlags_AccModel) => {
	console.log('handle: c2s.WriteNavFlags_Acc');
	//console.log(packet);


};
