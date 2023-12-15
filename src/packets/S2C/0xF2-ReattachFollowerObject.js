import BasePacket from '../BasePacket.js';

export default class ReattachFollowerObject extends BasePacket {
	static struct = {
		newOwnerId: 'uint32',
	};
}
