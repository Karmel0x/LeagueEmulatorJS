var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		SpellSlot: 'int32',
		bitfield_ToggleValue: 'uint8',
	}
};
