const BasePacket = require('../BasePacket');


module.exports = class SetInputLockFlag extends BasePacket {
	static struct = {
		inputLockFlags: 'uint32',
		bitfield: ['bitfield', {
			value: 1,
		}],
	}
};
