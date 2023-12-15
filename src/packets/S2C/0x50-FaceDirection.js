import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


export default class FaceDirection extends BasePacket {
	static struct = {
		flags: ['bitfield', {
			doLerpTime: 1,
		}],
		direction: SVector3,
		lerpTime: 'float',
	};
}
