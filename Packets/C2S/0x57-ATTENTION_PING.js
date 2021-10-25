var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//C2S.ATTENTION_PING
	struct = {
		Position: Vector2,
		TargetNetID: 'uint32',
		PingCategory: 'uint8',
	}
};
