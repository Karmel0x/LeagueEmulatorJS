var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SpellSlot: 'uint8',
		bitfield_ResetSpecified: 'uint8',
	}
};
