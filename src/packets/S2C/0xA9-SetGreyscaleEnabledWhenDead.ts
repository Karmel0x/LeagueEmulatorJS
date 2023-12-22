import BasePacket from '../BasePacket';


export default class SetGreyscaleEnabledWhenDead extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
