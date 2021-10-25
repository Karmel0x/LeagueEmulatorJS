var ExtendedPacket = require('../ExtendedPacket');
var ItemPacket = require('../SharedStruct/ItemPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		Items: [ItemPacket, 10],
		ItemCooldowns: ['float', 10],
		ItemMaxCooldowns: ['float', 10],
	}
};
