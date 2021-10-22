var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		CostType: 'uint8',
		SpellSlot: 'int32',
		Amount: 'float',
	}
};
