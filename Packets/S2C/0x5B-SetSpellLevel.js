var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SpellSlot: 'int32',
		spellLevel: 'int32',
	}
};
