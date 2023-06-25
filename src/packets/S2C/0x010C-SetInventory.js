const ExtendedPacket = require('../ExtendedPacket');
const SItemPacket = require('../sharedstruct/SItemPacket');


module.exports = class SetInventory extends ExtendedPacket {
	static struct = {
		items: [SItemPacket, 10],
		itemCooldowns: ['float', 10],
		itemMaxCooldowns: ['float', 10],
	}
};
