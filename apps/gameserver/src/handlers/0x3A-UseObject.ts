
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.UseObjectModel) => {
	console.log('handle: c2s.UseObject');
	//console.log(packet);


};
