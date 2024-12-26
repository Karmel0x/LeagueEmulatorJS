
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.UseObjectModel) => {
	console.log('handle: c2s.UseObject');
	//console.log(packet);


};
