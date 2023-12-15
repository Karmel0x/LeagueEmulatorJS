import BasePacket from '../BasePacket.js';

export default class RemoveItemAns extends BasePacket {
	static struct = {
		slot: 'uint8',
		itemsInSlot: 'uint8',
		bitfield: ['bitfield', {
			notifyInventoryChange: 1,
		}],
	};

	slot = 0;
	itemsInSlot = 0;
	bitfield = {
		notifyInventoryChange: false,
	};

}
