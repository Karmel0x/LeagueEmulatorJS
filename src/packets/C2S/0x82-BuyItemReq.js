const BasePacket = require('../BasePacket');


module.exports = class BuyItemReq extends BasePacket {
	static struct = {
		itemId: 'uint32',
	}
};
