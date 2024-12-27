
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.PlayVOCommandModel) => {
	console.log('handle: c2s.PlayVOCommand');
	//console.log(packet);


};
