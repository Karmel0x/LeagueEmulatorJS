import BasePacket from '../BasePacket';

export default class PauseAnimation extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			pause: 1,
		}],
	};
}
