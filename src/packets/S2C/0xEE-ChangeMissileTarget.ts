import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

export default class ChangeMissileTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		targetPosition: SVector3,
	};
}
