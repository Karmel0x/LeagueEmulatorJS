var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.HighlightHUDElement
	struct = {
		ElementPart: 'uint8',
		ElementType: 'uint8',
		ElementNumber: 'uint8',
		ElementSubCategory: 'uint8',
	}
};
