import BasePacket from '../BasePacket.js';

export default class ServerTick extends BasePacket {
	static struct = {
		delta: 'float',
	};
}
