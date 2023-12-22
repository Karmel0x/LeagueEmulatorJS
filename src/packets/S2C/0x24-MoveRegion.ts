import BasePacket from '../BasePacket';
import SVector2 from '../sharedstruct/SVector2';


export default class MoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
		position: SVector2,
	};
}
