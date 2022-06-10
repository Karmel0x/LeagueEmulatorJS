var ExtendedPacket = require('../ExtendedPacket');


module.exports = class MessageToClient_MapView extends ExtendedPacket {
	static struct = {
		bubbleDelay: 'float',
		slotNumber: 'int32',
		isError: 'uint8',
		colorIndex: 'uint8',
		floatTextType: 'uint32',
		message: 'string_',
	}
};
