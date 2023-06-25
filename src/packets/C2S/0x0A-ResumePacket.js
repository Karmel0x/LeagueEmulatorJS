const BasePacket = require('../BasePacket');


module.exports = class ResumePacket extends BasePacket {
	static struct = {
		clientId: 'uint8',
		bitfield: ['bitfield', {
			delayed: 1,
		}],
	}
};
