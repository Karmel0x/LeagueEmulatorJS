
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.OnReplication_AccModel) => {
	console.log('handle: c2s.OnReplication_Acc');
	//console.log(packet);


};
