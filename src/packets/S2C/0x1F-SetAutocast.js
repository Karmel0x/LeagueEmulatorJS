const BasePacket = require('../BasePacket');


// packet length should be 9
module.exports = class SetAutocast extends BasePacket {
	static struct = {
		slot: 'uint8',
		critSlot: 'uint8',
	}
};
