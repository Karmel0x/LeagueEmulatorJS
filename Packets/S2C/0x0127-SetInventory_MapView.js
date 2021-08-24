var ExtendedPacket = require('../ExtendedPacket');

const ItemPacket = {
	ItemID: 'uint32',
	Slot: 'uint8',
	ItemsInSlot: 'uint8',
	SpellCharges: 'uint8',
};

module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		Items: [ItemPacket, 10],
		ItemCooldowns: ['float', 10],
		ItemMaxCooldowns: ['float', 10],
	}
};
