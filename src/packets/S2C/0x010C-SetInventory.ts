import ExtendedPacket from '../ExtendedPacket';
import SItemPacket from '../sharedstruct/SItemPacket';


export default class SetInventory extends ExtendedPacket {
	static struct = {
		items: [SItemPacket, 10],
		itemCooldowns: ['float', 10],
		itemMaxCooldowns: ['float', 10],
	};
}
