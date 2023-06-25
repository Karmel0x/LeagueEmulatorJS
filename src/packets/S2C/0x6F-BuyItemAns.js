const BasePacket = require('../BasePacket');
const SItemPacket = require('../sharedstruct/SItemPacket');


module.exports = class BuyItemAns extends BasePacket {
	static struct = {
		item: SItemPacket,
		bitfield: ['bitfield', {
			unk: 1 << 0,
			unk2: 1 << 1,
		}],
	}
};
