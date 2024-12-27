
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.SpellChargeUpdateReqModel) => {
	console.log('handle: c2s.SpellChargeUpdateReq');
	//console.log(packet);


};
