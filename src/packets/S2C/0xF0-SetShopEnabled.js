import BasePacket from '../BasePacket.js';


export default class SetShopEnabled extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
			forceEnabled: 2,
		}],
	};
}
