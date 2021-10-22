var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		VolumeCategoryType: 'uint8',
		bitfield_Mute: 'uint8',//(bitfield & 0x01u) != 0
	}
};
