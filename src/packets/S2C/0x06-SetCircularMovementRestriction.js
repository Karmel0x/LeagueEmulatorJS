import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


/**
 * restrict movement
 * may be usefull to prevent leaving specific area
 * ex. prevent leaving spawn or new mordekaiser ult
 */
export default class SetCircularMovementRestriction extends BasePacket {
	static struct = {
		center: SVector3,
		radius: 'float',
		bitfield: ['bitfield', {
			restrictCamera: 1,
		}],
	};
}
