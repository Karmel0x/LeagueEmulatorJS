import BasePacket from '../BasePacket.js';

export default class SetHoverIndicatorEnabled extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
