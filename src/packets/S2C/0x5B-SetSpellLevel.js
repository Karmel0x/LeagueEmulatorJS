const BasePacket = require('../BasePacket');

module.exports = class SetSpellLevel extends BasePacket {
	static struct = {
		spellSlot: 'int32',
		spellLevel: 'int32',
	}
};
