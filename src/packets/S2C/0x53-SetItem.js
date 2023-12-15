import BasePacket from '../BasePacket.js';
import SItemPacket from '../sharedstruct/SItemPacket.js';


export default class SetItem extends BasePacket {
	static struct = {
		item: SItemPacket,
	};
}
