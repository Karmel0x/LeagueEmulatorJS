
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.UnitSendDrawPathModel) => {
	console.log('handle: c2s.UnitSendDrawPath');
	//console.log(packet);

};
