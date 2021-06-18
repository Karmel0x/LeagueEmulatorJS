var Vector2 = require('./SharedStruct/Vector2');

module.exports = {//C2S_ATTENTION_PING
	cmd: 'uint8',
	netId: 'uint32',

	Position: Vector2,
	TargetNetID: 'uint32',
	pingType: 'uint8',
};
