
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.UnitSendDrawPathModel) => {
	console.log('handle: c2s.UnitSendDrawPath');
	//console.log(packet);

};
