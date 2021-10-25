var BasePacket = require('../BasePacket');
var ItemPacket = require('../SharedStruct/ItemPacket');


module.exports = class extends BasePacket {//S2C.BUY_ITEM_ANS
	struct = {
		Item: ItemPacket,
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
