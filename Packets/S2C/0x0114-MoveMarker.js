var ExtendedPacket = require('../ExtendedPacket');
const Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		position: Vector2,
		Goal: Vector2,
		Speed: 'float',
		bitfield_FaceGoalPosition: 'uint8',
	}
};
