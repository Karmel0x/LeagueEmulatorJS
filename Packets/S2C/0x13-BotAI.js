const BasePacket = require('../BasePacket');

module.exports = class BotAI extends BasePacket {
	static struct = {
		AIName: ['char', 64],
		AIStrategy: ['char', 64],
		AIBehaviour: ['char', 64],
		AITask: ['char', 64],
		states: {
			0: ['char', 64],
			1: ['char', 64],
			2: 'string0',//64
		},
	}
};
