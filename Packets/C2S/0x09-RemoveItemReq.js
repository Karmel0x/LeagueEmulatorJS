const BasePacket = require('../BasePacket');


module.exports = class RemoveItemReq extends BasePacket {
	static struct = {
		slot: 'uint8',
		bitfield: ['bitfield', {
			sell: 1,
		}],
	}
};
