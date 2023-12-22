import BasePacket from '../BasePacket';

export default class ReattachFollowerObject extends BasePacket {
	static struct = {
		newOwnerId: 'uint32',
	};
}
