import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';


export default class MoveCameraToPoint extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			startFromCurrentPosition: 1,
			unlockCamera: 2,
		}],
		startPosition: SVector3,
		targetPosition: SVector3,
		travelTime: 'float',
	};
}
