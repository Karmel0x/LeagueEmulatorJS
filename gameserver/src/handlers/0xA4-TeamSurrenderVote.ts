
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.TeamSurrenderVoteModel) => {
	console.log('handle: c2s.TeamSurrenderVote');
	//console.log(packet);


};
