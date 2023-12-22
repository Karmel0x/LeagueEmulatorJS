import BasePacket from '../BasePacket';


export default class EndGame extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isTeamOrderWin: 1,
		}],
	};
}
