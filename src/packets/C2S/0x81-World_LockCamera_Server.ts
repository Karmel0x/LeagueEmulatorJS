import BasePacket from '../BasePacket';

export default class World_LockCamera_Server extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			locked: 1,
		}],
		clientId: 'int32',
	};
}
