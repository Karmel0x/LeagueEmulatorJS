var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		BubbleDelay: 'float',
		SlotNumber: 'int32',
		IsError: 'uint8',
		ColorIndex: 'uint8',
		FloatTextType: 'uint32',
		Message: 'string_',
	}
};
