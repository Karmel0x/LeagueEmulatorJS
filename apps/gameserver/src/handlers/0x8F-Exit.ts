
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.ExitModel) => {
	console.log('handle: c2s.Exit');
	//console.log(packet);


};
