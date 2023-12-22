import ExtendedPacket from '../ExtendedPacket';
import SVector3 from '../sharedstruct/SVector3';

export default class UnitSendDrawPath extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		drawPathNodeType: 'uint8',
		point: SVector3,
	};
}
