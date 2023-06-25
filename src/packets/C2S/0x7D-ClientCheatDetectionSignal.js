const BasePacket = require('../BasePacket');


module.exports = class ClientCheatDetectionSignal extends BasePacket {
	static struct = {
		signal: 'uint32',
		flags: 'uint32',
	}
};
