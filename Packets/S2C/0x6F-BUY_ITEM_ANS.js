var BasePacket = require('../BasePacket');
var Item = {
	ItemID: 'uint32',
	Slot: 'uint8',
	ItemsInSlot: 'uint8',
	SpellCharges: 'uint8',
};

module.exports = class extends BasePacket {//S2C.BUY_ITEM_ANS
	struct = {
		Item: Item,
		Bitfield: 'uint8',
	}
};
