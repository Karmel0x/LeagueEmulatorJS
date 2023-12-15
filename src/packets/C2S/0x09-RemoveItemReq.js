import BasePacket from '../BasePacket.js';


export default class RemoveItemReq extends BasePacket {
	static struct = {
		slot: 'uint8',
		bitfield: ['bitfield', {
			sell: 1,
		}],
	};
}
