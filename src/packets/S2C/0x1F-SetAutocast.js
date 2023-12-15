import BasePacket from '../BasePacket.js';


// packet length should be 9
export default class SetAutocast extends BasePacket {
	static struct = {
		slot: 'uint8',
		critSlot: 'uint8',
	};
}
