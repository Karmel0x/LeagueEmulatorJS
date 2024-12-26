
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.Waypoint_AccModel) => {
	console.log('handle: c2s.Waypoint_Acc');
	//console.log(packet);


};
