const BasePacket = require('../BasePacket');
const STipConfig = require('../sharedstruct/STipConfig');

module.exports = class ClientReady extends BasePacket {
	static struct = {
		dummy1: ['char', 4],
		tipConfig: STipConfig,
		dummy2: ['char', 8],
	}
};
