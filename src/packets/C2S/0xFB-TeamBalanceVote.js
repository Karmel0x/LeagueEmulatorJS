const BasePacket = require('../BasePacket');

module.exports = class TeamBalanceVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
		}],
	}
};
