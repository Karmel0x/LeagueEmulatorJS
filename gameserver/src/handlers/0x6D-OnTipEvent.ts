
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.OnTipEventModel) => {
	console.log('handle: c2s.OnTipEvent');
	//console.log(packet);


};
