var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield_Unknown: 'uint8',
		VoiceOverride: 'string0',//64
	}
};
