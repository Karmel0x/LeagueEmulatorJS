const BasePacket = require('../BasePacket');

module.exports = class ToggleInputLockFlag extends BasePacket {
	static struct = {
		inputLockFlags: 'uint32',
	}
};
