import BasePacket from '../BasePacket.js';
import SVector2 from '../sharedstruct/SVector2.js';


export default class MoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
		position: SVector2,
	};
}
