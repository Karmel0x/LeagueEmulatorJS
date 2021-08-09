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
		bitfield: ['bitfield', {
			unk0: 1 << 0,
			unk1: 1 << 1,
			unk2: 1 << 2,
			unk3: 1 << 3,
			unk4: 1 << 4,
			unk5: 1 << 5,
		}],
	}
};
