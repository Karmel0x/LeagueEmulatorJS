import BasePacket from '../BasePacket';

export default class StartGame extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enablePause: 1,
		}],
	};
}
