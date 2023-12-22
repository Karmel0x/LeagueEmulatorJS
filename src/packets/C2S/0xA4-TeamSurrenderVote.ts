import BasePacket from '../BasePacket';


export default class TeamSurrenderVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
		}],
	};
}
