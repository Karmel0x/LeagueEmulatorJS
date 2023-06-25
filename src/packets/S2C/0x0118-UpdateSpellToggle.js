const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UpdateSpellToggle extends ExtendedPacket {
	static struct = {
		spellSlot: 'int32',
		bitfield: ['bitfield', {
			toggleValue: 1,
		}],
	}
};
