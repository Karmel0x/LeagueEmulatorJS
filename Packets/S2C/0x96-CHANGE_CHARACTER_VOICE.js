var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',// Unknown
		VoiceOverride: 'string0',//['char', 64],
	}
};
