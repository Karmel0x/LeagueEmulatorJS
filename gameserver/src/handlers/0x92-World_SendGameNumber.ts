
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.World_SendGameNumberModel) => {
	console.log('handle: c2s.World_SendGameNumber');
	//console.log(packet);


};
