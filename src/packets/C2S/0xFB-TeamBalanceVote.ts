import BasePacket from '../BasePacket';

export default class TeamBalanceVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
		}],
	};
}
