
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.SendSelectedObjIdModel) => {
	console.log('handle: c2s.SendSelectedObjId');
	//console.log(packet);


};
