import BasePacket from '../BasePacket.js';

export default class TeamBalanceVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
		}],
	};
}
