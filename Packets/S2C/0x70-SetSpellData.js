var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		ObjectNetID: 'uint32',
		HashedSpellName: 'uint32',
		SpellSlot: 'uint8',
	}
};
