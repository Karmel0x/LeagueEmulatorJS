
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.SynchSimTimeModel) => {
	console.log('handle: synchClock.SynchSimTime');
	//console.log(packet);


};
