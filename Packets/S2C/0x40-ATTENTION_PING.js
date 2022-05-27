var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//S2C.ATTENTION_PING
	struct = {
		position: Vector2,
		TargetNetId: 'uint32',
		SourceNetId: 'uint32',
		PingCategory: 'uint8',
		bitfield: ['bitfield', {
			PlayAudio: 1,
			ShowChat: 2,
			PingThrottled: 4,
			PlayVO: 8,
		}],//0xFB // 4.18
	}
};
