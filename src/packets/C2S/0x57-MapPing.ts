import BasePacket from '../BasePacket';
import SVector2 from '../sharedstruct/SVector2';

export default class MapPing extends BasePacket {
	static struct = {
		position: SVector2,
		targetNetId: 'uint32',
		pingCategory: 'uint8',//(bitfield & 0x0F)
	};
}
