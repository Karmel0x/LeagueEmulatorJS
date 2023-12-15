import ExtendedPacket from '../ExtendedPacket.js';
import SVector2 from '../sharedstruct/SVector2.js';


export default class MoveMarker extends ExtendedPacket {
	static struct = {
		position: SVector2,
		goal: SVector2,
		speed: 'float',
		bitfield: ['bitfield', {
			faceGoalPosition: 1,
		}],
	};
}
