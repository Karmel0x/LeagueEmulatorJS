import BasePacket from '../BasePacket';

export default class LockCamera extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			lock: 1,
		}],
	};
}
