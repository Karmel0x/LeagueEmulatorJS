
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.TeamSurrenderVoteModel) => {
	console.log('handle: c2s.TeamSurrenderVote');
	//console.log(packet);


};
