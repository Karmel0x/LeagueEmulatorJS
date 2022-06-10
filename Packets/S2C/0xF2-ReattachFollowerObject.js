const BasePacket = require('../BasePacket');

module.exports = class ReattachFollowerObject extends BasePacket {
	static struct = {
		newOwnerId: 'uint32',
	}
};
