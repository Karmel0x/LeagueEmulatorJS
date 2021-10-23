var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		ElementID: 'uint8',
		ElementType: 'uint8',
		ElementNumber: 'uint8',
		ElementSubCategory: 'uint8',
		bitfield_Enabled: 'uint8',
	}
};
