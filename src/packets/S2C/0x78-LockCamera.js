import BasePacket from '../BasePacket.js';

export default class LockCamera extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			lock: 1,
		}],
	};
}
