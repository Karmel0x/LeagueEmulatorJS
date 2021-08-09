var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//C2S.BUY_ITEM_REQ
	struct = {
		ItemID: 'uint32',
	}
};
