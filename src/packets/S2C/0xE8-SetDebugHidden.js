const BasePacket = require('../BasePacket');

module.exports = class SetDebugHidden extends BasePacket {
	static struct = {
		objectId: 'int32',
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	}
};
