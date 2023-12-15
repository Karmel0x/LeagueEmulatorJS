import BasePacket from '../BasePacket.js';


export default class EndGame extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isTeamOrderWin: 1,
		}],
	};
}
