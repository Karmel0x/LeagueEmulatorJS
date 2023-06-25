const BasePacket = require('../BasePacket');


module.exports = class UseItemAns extends BasePacket {
	static struct = {
		slot: 'uint8',
		itemsInSlot: 'uint8',
		spellCharges: 'uint8',
	}
};
