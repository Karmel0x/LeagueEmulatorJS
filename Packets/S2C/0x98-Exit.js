const BasePacket = require('../BasePacket');

// Disconnected announcement
module.exports = class Exit extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		bitfield: ['bitfield', {
			Unknown: 1,//isAlly?
		}],
	}
};
