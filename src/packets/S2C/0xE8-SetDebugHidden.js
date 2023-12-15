import BasePacket from '../BasePacket.js';

export default class SetDebugHidden extends BasePacket {
	static struct = {
		objectId: 'int32',
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	};
}
