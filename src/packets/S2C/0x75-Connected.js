import BasePacket from '../BasePacket.js';

export default class Connected extends BasePacket {
	static struct = {
		clientId: 'int32',
	};
}
