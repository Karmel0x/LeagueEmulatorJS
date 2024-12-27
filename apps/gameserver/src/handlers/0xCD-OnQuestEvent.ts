
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.OnQuestEventModel) => {
	console.log('handle: c2s.OnQuestEvent');
	//console.log(packet);


};
