import ExtendedPacket from '../ExtendedPacket.js';
import SItemPacket from '../sharedstruct/SItemPacket.js';


export default class SetInventory extends ExtendedPacket {
	static struct = {
		items: [SItemPacket, 10],
		itemCooldowns: ['float', 10],
		itemMaxCooldowns: ['float', 10],
	};
}
