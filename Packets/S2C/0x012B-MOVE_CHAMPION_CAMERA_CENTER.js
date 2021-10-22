var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		bitfield1_unk1: 'uint8',
		unk1: 'float',
		unk2: 'float',
		unk3: 'float',
		bitfield2_unk1: 'uint8',
	}
};
