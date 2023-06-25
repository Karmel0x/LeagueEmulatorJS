const ExtendedPacket = require('../ExtendedPacket');
const SVector2 = require('../sharedstruct/SVector2');


module.exports = class MoveMarker extends ExtendedPacket {
	static struct = {
		position: SVector2,
		goal: SVector2,
		speed: 'float',
		bitfield: ['bitfield', {
			faceGoalPosition: 1,
		}],
	}
};
