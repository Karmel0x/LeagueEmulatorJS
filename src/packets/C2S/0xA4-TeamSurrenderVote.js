import BasePacket from '../BasePacket.js';


export default class TeamSurrenderVote extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			voteYes: 1,
		}],
	};
}
