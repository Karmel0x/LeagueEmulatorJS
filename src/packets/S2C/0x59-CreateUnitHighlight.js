const BasePacket = require('../BasePacket');

module.exports = class CreateUnitHighlight extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
