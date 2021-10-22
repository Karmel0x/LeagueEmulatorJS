var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		UnitNetID: 'uint32',
		TeamID: 'uint32',
	}
};
