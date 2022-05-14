var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		UnitNetId: 'uint32',
		PARState: 'uint32',
	}
};
