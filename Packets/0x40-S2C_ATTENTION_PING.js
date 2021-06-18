var Vector2 = require('./SharedStruct/Vector2');

module.exports = {//S2C_ATTENTION_PING
	cmd: 'uint8',
	netId: 'uint32',

	Position: Vector2,
	TargetNetID: 'uint32',
	netId2: 'uint32',
	pingType: 'uint8',
	unk1: 'uint8',//0xFB // 4.18
};
