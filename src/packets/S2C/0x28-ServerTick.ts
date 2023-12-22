import BasePacket from '../BasePacket';

export default class ServerTick extends BasePacket {
	static struct = {
		delta: 'float',
	};
}
