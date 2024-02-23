
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.UseObjectModel) => {
	console.log('handle: c2s.UseObject');
	//console.log(packet);


};
