import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

export default class AddDebugObject extends BasePacket {
	static struct = {
		debugId: 'int32',
		lifetime: 'float',
		type: 'uint8',
		netId1: 'uint32',
		netId2: 'uint32',
		radius: 'float',
		point1: SVector3,
		point2: SVector3,
		color: 'uint32',
		maxSize: 'uint32',
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
		stringBuffer: 'string0',//128
	};
}
