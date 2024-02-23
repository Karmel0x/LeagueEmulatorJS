
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.SpellChargeUpdateReqModel) => {
	console.log('handle: c2s.SpellChargeUpdateReq');
	//console.log(packet);


};
