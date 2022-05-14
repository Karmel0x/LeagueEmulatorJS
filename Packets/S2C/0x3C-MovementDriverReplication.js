var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

var MovementDriverHomingData = {
	TargetNetId: 'uint32',
	TargetHeightModifier: 'float',
	TargetPosition: Vector3,
	Speed: 'float',
	Gravity: 'float',
	RateOfTurn: 'float',
	Duration: 'float',
	MovementPropertyFlags: 'uint32',
};


module.exports = class extends BasePacket {//S2C.
	struct = {
		MovementTypeID: 'uint8',
		Position: Vector3,
		Velocity: Vector3,
		movementDriverParamType: 'int32',
	}
	reader(buffer){
		super.reader(buffer);

		if(this.movementDriverParamType == 1)
			this.MovementDriverHomingData = buffer.readobj(MovementDriverHomingData);
	}
	writer(buffer){
		super.writer(buffer);

		if(this.movementDriverParamType == 1)
			buffer.writeobj(MovementDriverHomingData, this.MovementDriverHomingData);
	}
};
