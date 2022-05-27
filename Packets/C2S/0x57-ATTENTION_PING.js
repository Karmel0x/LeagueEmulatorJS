var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//C2S.ATTENTION_PING
	struct = {
		position: Vector2,
		TargetNetId: 'uint32',
		PingCategory: 'uint8',
	}
};
