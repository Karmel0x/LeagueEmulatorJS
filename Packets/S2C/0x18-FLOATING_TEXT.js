var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.FLOATING_TEXT
	struct = {
		BubbleDelay: 'float',
		SlotNumber: 'int32',
		IsError: 'uint8',
		ColorIndex: 'uint8',
		FloatTextType: 'uint32',
		Message: 'string_',
	}
};
