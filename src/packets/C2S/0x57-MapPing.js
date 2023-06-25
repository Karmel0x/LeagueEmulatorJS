const BasePacket = require('../BasePacket');
const SVector2 = require('../sharedstruct/SVector2');

module.exports = class MapPing extends BasePacket {
	static struct = {
		position: SVector2,
		targetNetId: 'uint32',
		pingCategory: 'uint8',//(bitfield & 0x0F)
	}
};
