
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.UnitSendDrawPathModel) => {
	console.log('handle: c2s.UnitSendDrawPath');
	//console.log(packet);

};
