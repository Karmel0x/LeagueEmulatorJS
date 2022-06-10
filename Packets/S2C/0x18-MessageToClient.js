const BasePacket = require('../BasePacket');

module.exports = class MessageToClient extends BasePacket {
	static struct = {
		bubbleDelay: 'float',
		slotNumber: 'int32',
		isError: 'uint8',
		colorIndex: 'uint8',
		floatTextType: 'uint32',
		message: 'string_',
	}
};
