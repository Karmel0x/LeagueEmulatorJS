import BasePacket from '../BasePacket.js';

export default class Reconnect extends BasePacket {
	static struct = {
		clientId: 'int32',
	};
}
