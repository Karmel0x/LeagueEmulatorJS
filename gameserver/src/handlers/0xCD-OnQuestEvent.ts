
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.OnQuestEventModel) => {
	console.log('handle: c2s.OnQuestEvent');
	//console.log(packet);


};
