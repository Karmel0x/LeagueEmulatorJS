
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.TeamBalanceVoteModel) => {
	console.log('handle: c2s.TeamBalanceVote');
	//console.log(packet);


};
