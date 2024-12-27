
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.PlayContextualEmoteModel) => {
	console.log('handle: c2s.PlayContextualEmote');
	//console.log(packet);


};
