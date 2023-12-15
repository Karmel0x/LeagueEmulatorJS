import BasePacket from '../BasePacket.js';


export default class UseItemAns extends BasePacket {
	static struct = {
		slot: 'uint8',
		itemsInSlot: 'uint8',
		spellCharges: 'uint8',
	};
}
