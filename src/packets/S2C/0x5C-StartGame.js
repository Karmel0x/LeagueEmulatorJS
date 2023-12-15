import BasePacket from '../BasePacket.js';

export default class StartGame extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enablePause: 1,
		}],
	};
}
