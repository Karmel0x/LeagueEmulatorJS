import BasePacket from '../BasePacket.js';

export default class ReplayOnly_GoldEarned extends BasePacket {
	static struct = {
		ownerId: 'uint32',
		amount: 'float',
	};
}
