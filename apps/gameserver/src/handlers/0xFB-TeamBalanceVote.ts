
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.TeamBalanceVoteModel) => {
	console.log('handle: c2s.TeamBalanceVote');
	//console.log(packet);


};
