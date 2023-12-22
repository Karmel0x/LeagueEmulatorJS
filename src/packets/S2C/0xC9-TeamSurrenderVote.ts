import BasePacket from '../BasePacket';


export default class TeamSurrenderVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
			openVoteMenu: 2,
		}],
		playerNetId: 'uint32',
		forVote: 'uint8',
		againstVote: 'uint8',
		numPlayers: 'uint8',
		team: 'uint32',
		timeout: 'float',
	};
}
