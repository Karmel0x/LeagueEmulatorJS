const BasePacket = require('../BasePacket');

module.exports = class EndOfGameEvent extends BasePacket {
	static struct = {
		teamIsOrder: 'bool',
	}
};
