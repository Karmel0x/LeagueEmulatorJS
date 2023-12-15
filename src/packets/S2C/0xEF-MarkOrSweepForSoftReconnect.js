import BasePacket from '../BasePacket.js';

export default class MarkOrSweepForSoftReconnect extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	};
}
