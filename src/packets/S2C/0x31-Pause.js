import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';

export default class Pause extends BasePacket {
	static struct = {
		position: SVector3,
		forward: SVector3,
		syncId: 'int32',
	};
}
