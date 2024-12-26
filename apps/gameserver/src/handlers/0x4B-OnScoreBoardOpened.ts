
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.OnScoreBoardOpenedModel) => {
	console.log('handle: c2s.OnScoreBoardOpened');
	//console.log(packet);


};
