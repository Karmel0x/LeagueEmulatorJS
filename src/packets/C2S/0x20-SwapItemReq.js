import BasePacket from '../BasePacket.js';


export default class SwapItemReq extends BasePacket {
	static struct = {
		sourceSlot: 'uint8',
		destinationSlot: 'uint8',
	};
}
