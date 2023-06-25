const BasePacket = require('../BasePacket');


module.exports = class PausePacket extends BasePacket {
	static struct = {
		clientId: 'int32',
		pauseTimeRemaining: 'int32',
		bitfield: ['bitfield', {
			isTournament: 1,
		}],
	}
};
