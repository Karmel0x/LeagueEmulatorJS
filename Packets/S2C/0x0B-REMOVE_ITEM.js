var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		Slot: 'uint8',
		ItemsInSlot: 'uint8',
		bitfield_NotifyInventoryChange: 'uint8',
	}
};
