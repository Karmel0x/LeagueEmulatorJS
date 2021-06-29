var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
        //this.Unknown1 = (bitfield) != 0;
		VoiceOverride: ['char', 64],
	}
};
