
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.ClientFinishedModel) => {
	console.log('handle: c2s.ClientFinished');
	//console.log(packet);


};