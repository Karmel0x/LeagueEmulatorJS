const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetSpellPARCost extends ExtendedPacket {
	static struct = {
		costType: 'uint8',
		spellSlot: 'int32',
		amount: 'float',
	}
};
