import ExtendedPacket from '../ExtendedPacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


export default class UnitSetLookAt extends ExtendedPacket {
	static LookAtType = {
		Direction: 0,
		Location: 1,
		Unit: 2,
	};

	static struct = {
		lookAtType: 'uint8',
		targetPosition: SVector3,
		targetNetId: 'uint32',
	};
}
