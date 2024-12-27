
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.Waypoint_AccModel) => {
	console.log('handle: c2s.Waypoint_Acc');
	//console.log(packet);


};
