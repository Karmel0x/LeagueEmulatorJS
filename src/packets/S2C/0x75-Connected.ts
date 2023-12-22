import BasePacket from '../BasePacket';

export default class Connected extends BasePacket {
	static struct = {
		clientId: 'int32',
	};
}
