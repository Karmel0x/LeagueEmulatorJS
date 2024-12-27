
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.WorldSendGameNumberC2SModel) => {
	console.log('handle: c2s.World_SendGameNumber');
	//console.log(packet);


};
