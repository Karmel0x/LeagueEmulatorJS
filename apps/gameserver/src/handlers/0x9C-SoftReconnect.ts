
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.SoftReconnectModel) => {
	console.log('handle: c2s.SoftReconnect');
	//console.log(packet);


};
