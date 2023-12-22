import BasePacket from '../BasePacket';

export default class SetDebugHidden extends BasePacket {
	static struct = {
		objectId: 'int32',
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	};
}
