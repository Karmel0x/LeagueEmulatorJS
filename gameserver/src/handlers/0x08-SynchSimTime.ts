
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.SynchSimTimeModel) => {
	console.log('handle: synchClock.SynchSimTime');
	//console.log(packet);


};
