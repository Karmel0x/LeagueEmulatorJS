
import * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.AI_CommandModel) => {
	console.log('handle: c2s.AI_Command');
	//console.log(packet);

};
