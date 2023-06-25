const BasePacket = require('../BasePacket');


module.exports = class SwapItemReq extends BasePacket {
	static struct = {
		sourceSlot: 'uint8',
		destinationSlot: 'uint8',
	}
};
