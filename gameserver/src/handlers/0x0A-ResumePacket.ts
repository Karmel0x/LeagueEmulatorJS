
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.ResumePacketModel) => {
	console.log('handle: c2s.ResumePacket');
	//console.log(packet);


};
