
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.TeamSurrenderVoteModel) => {
	console.log('handle: c2s.TeamSurrenderVote');
	//console.log(packet);


};
