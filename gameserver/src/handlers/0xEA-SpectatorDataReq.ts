
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.SpectatorDataReqModel) => {
	console.log('handle: c2s.SpectatorDataReq');
	//console.log(packet);


};
