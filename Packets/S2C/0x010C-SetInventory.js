var ExtendedPacket = require('../ExtendedPacket');
var SItemPacket = require('../SharedStruct/SItemPacket');


module.exports = class SetInventory extends ExtendedPacket {
	static struct = {
		items: [SItemPacket, 10],
		itemCooldowns: ['float', 10],
		itemMaxCooldowns: ['float', 10],
	}
};
