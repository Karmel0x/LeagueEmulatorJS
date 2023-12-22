import BasePacket from '../BasePacket';

export default class AI_Command extends BasePacket {
	static struct = {
		command: 'string0',//128
	};
}
