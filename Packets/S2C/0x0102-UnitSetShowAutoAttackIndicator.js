var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		NetID: 'uint32',
		bitfield: ['bitfield', {
			ShowIndicator: 1,
			ShowMinimapIndicator: 2,
		}],
	}
};
