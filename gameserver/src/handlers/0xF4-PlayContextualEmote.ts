
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.PlayContextualEmoteModel) => {
	console.log('handle: c2s.PlayContextualEmote');
	//console.log(packet);


};
