import BasePacket from '../BasePacket';

export default class SetFoWStatus extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
