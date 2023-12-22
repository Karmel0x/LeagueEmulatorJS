import BasePacket from '../BasePacket';

export default class Reconnect extends BasePacket {
	static struct = {
		clientId: 'int32',
	};
}
