const BasePacket = require('../BasePacket');


module.exports = class TeamSurrenderVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
			openVoteMenu: 2,
		}],
		playerNetId: 'uint32',
		forVote: 'uint8',
		againstVote: 'uint8',
		numPlayers: 'uint8',
		teamId: 'uint32',
		timeout: 'float',
	}
};
