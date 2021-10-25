var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		bitfield_Unknown: 'uint8',
		Unknown: 'float',
		Unknown2: 'float',
		Unknown3: 'float',
		bitfield2_Unknown: 'uint8',
	}
};
