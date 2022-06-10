const BasePacket = require('../BasePacket');
var SVector2 = require('../SharedStruct/SVector2');

module.exports = class MapPing extends BasePacket {
	static struct = {
		position: SVector2,
		targetNetId: 'uint32',
		sourceNetId: 'uint32',
		pingCategory: 'uint8',
		bitfield: ['bitfield', {
			playAudio: 1,
			showChat: 2,
			pingThrottled: 4,
			playVO: 8,
		}],//0xFB // 4.18
	}
};
