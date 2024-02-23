
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.PlayVOCommandModel) => {
	console.log('handle: c2s.PlayVOCommand');
	//console.log(packet);


};
