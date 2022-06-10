const BasePacket = require('../BasePacket');

module.exports = class RemoveItemAns extends BasePacket {
	static struct = {
		slot: 'uint8',
		itemsInSlot: 'uint8',
		bitfield: ['bitfield', {
			notifyInventoryChange: 1,
		}],
	}
};
