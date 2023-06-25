const BasePacket = require('../BasePacket');

module.exports = class MuteVolumeCategory extends BasePacket {
	static struct = {
		volumeCategoryType: 'uint8',
		bitfield: ['bitfield', {
			mute: 1,
		}],
	}
};
