const BasePacket = require('../BasePacket');
var SVector2 = require('../SharedStruct/SVector2');

module.exports = class MapPing extends BasePacket {
	static struct = {
		position: SVector2,
		targetNetId: 'uint32',
		pingCategory: 'uint8',//(bitfield & 0x0F)
	}
};
