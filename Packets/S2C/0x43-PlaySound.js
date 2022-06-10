const BasePacket = require('../BasePacket');

module.exports = class PlaySound extends BasePacket {
	static struct = {
		soundName: ['char', 1024],
		ownerNetId: 'uint32',
	}
};
