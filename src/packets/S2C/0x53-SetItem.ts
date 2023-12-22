import BasePacket from '../BasePacket';
import SItemPacket from '../sharedstruct/SItemPacket';


export default class SetItem extends BasePacket {
	static struct = {
		item: SItemPacket,
	};
}
