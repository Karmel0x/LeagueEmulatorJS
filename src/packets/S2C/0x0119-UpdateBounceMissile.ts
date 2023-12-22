import ExtendedPacket from '../ExtendedPacket';
import SVector3 from '../sharedstruct/SVector3';

export default class UpdateBounceMissile extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		casterPosition: SVector3,
	};
}
