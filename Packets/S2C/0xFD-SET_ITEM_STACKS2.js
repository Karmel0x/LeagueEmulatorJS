var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Slot: 'uint8',
		SpellCharges: 'uint8',
	}
};
