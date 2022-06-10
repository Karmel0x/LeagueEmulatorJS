const BasePacket = require('../BasePacket');


module.exports = class TeamSurrenderVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
		}],
	}
};
