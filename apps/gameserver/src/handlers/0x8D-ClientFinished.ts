
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.ClientFinishedModel) => {
	console.log('handle: c2s.ClientFinished');
	//console.log(packet);


};
