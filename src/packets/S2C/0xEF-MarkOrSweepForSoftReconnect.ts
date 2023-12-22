import BasePacket from '../BasePacket';

export default class MarkOrSweepForSoftReconnect extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	};
}
