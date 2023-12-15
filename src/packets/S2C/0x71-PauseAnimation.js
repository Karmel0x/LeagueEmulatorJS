import BasePacket from '../BasePacket.js';

export default class PauseAnimation extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			pause: 1,
		}],
	};
}
