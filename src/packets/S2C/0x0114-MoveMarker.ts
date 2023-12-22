import ExtendedPacket from '../ExtendedPacket';
import SVector2 from '../sharedstruct/SVector2';


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
