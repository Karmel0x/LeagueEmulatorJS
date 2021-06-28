var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//S2C.ATTENTION_PING
	struct = {
		Position: Vector2,
		TargetNetID: 'uint32',
		netId2: 'uint32',
		pingType: 'uint8',
		unk1: 'uint8',//0xFB // 4.18
	}
};
