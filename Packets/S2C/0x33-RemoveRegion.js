const BasePacket = require('../BasePacket');


module.exports = class RemoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
	}
};
