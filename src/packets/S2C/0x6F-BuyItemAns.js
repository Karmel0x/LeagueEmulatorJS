import BasePacket from '../BasePacket.js';
import SItemPacket from '../sharedstruct/SItemPacket.js';


export default class BuyItemAns extends BasePacket {
	static struct = {
		item: SItemPacket,
		bitfield: ['bitfield', {
			unk: 1 << 0,
			unk2: 1 << 1,
		}],
	};
}
