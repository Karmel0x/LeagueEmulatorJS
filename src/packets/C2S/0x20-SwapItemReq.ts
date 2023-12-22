import BasePacket from '../BasePacket';


export default class SwapItemReq extends BasePacket {
	static struct = {
		sourceSlot: 'uint8',
		destinationSlot: 'uint8',
	};
}
