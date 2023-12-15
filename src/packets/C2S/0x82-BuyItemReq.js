import BasePacket from '../BasePacket.js';


export default class BuyItemReq extends BasePacket {
	static struct = {
		itemId: 'uint32',
	};
}
