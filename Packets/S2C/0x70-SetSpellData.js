var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.REMOVE_ITEM
	struct = {
		ObjectNetID: 'uint32',
		HashedSpellName: 'uint32',
		SpellSlot: 'uint8',
	}
};
