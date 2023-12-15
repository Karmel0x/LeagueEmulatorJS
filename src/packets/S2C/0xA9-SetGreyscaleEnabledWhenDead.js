import BasePacket from '../BasePacket.js';


export default class SetGreyscaleEnabledWhenDead extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
