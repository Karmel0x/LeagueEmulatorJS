var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		MovementTypeID: 'uint8',
		Position: Vector3,
		Velocity: Vector3,
		movementDriverParamType: 'int32',
		//MovementDriverHomingData: ['ReadMovementDriverHomingData', movementDriverParamType == 1],
	}
};
