
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.SoftReconnectModel) => {
	console.log('handle: c2s.SoftReconnect');
	//console.log(packet);


};
