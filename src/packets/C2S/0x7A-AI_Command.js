import BasePacket from '../BasePacket.js';

export default class AI_Command extends BasePacket {
	static struct = {
		command: 'string0',//128
	};
}
