var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		ItemPacket: ['ItemPacket', 10],//todo
		ItemCooldowns: ['float', 10],
		ItemMaxCooldowns: ['float', 10],
	}
};
