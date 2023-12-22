import BasePacket from '../BasePacket';


export default class BuyItemReq extends BasePacket {
	static struct = {
		itemId: 'uint32',
	};
}
