import ExtendedPacket from '../ExtendedPacket.js';
import SVector3 from '../sharedstruct/SVector3.js';

export default class UnitSendDrawPath extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		drawPathNodeType: 'uint8',
		point: SVector3,
	};
}
