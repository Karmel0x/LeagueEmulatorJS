
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.PausePacketModel) => {
	console.log('handle: c2s.PausePacket');
	//console.log(packet);


};
