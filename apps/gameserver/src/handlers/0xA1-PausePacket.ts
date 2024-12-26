
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.PausePacketModel) => {
	console.log('handle: c2s.PausePacket');
	//console.log(packet);


};
