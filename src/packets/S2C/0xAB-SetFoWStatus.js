import BasePacket from '../BasePacket.js';

export default class SetFoWStatus extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
