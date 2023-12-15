import BasePacket from '../BasePacket.js';

export default class BotAI extends BasePacket {
	static struct = {
		aiName: ['char', 64],
		aiStrategy: ['char', 64],
		aiBehaviour: ['char', 64],
		aiTask: ['char', 64],
		states: {
			0: ['char', 64],
			1: ['char', 64],
			2: 'string0',//64
		},
	};
}
