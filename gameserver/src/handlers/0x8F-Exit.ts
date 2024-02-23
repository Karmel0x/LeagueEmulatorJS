
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.ExitModel) => {
	console.log('handle: c2s.Exit');
	//console.log(packet);


};
