
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.WriteNavFlags_AccModel) => {
	console.log('handle: c2s.WriteNavFlags_Acc');
	//console.log(packet);


};
