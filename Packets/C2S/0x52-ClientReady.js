const BasePacket = require('../BasePacket');
var STipConfig = require('../SharedStruct/STipConfig');

module.exports = class ClientReady extends BasePacket {
	static struct = {
		dummy1: ['char', 4],
		tipConfig: STipConfig,
		dummy2: ['char', 8],
	}
};
