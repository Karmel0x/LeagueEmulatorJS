import BasePacket from '../BasePacket';

export default class SetHoverIndicatorEnabled extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
