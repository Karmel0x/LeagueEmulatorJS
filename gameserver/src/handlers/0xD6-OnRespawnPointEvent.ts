
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.OnRespawnPointEventModel) => {
	console.log('handle: c2s.OnRespawnPointEvent');
	//console.log(packet);


};
