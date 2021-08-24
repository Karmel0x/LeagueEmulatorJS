var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			Unknown1: 1,
		}],
		Unknown2: 'uint32',
		Unknown3: 'uint32',
	}
};
