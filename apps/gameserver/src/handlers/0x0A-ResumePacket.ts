
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.ResumePacketModel) => {
	console.log('handle: c2s.ResumePacket');
	//console.log(packet);


};
