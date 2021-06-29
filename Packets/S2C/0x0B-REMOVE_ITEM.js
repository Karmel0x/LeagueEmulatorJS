var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.REMOVE_ITEM
	struct = {
		Slot: 'uint8',
		ItemsInSlot: 'uint8',
		NotifyInventoryChange: 'uint8',
	}
};
