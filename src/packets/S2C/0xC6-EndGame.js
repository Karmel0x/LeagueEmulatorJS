const BasePacket = require('../BasePacket');


module.exports = class EndGame extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isTeamOrderWin: 1,
		}],
	}
};
