import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';

export default class ChangeMissileTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		targetPosition: SVector3,
	};
}
