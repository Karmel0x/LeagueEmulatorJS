import BasePacket from '../BasePacket';

// Disconnected announcement
export default class Exit extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		bitfield: ['bitfield', {
			Unknown: 1,//isAlly?
		}],
	};
}
