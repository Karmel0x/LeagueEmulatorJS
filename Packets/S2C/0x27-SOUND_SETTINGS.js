var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		VolumeCategoryType: 'uint8',
		bitfield_Mute: 'uint8',
	}
};
