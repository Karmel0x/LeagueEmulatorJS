var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		AIName: ['char', 64],
		AIStrategy: ['char', 64],
		AIBehaviour: ['char', 64],
		AITask: ['char', 64],
		States: {
			0: ['char', 64],
			1: ['char', 64],
			2: 'string0',//64
		},
	}
};
