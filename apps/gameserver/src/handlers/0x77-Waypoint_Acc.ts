
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.Waypoint_AccModel) => {
	console.log('handle: c2s.Waypoint_Acc');
	//console.log(packet);


};
