import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';

const MovementDriverHomingData = {
	targetNetId: 'uint32',
	targetHeightModifier: 'float',
	targetPosition: SVector3,
	speed: 'float',
	gravity: 'float',
	rateOfTurn: 'float',
	duration: 'float',
	movementPropertyFlags: 'uint32',
};


export default class MovementDriverReplication extends BasePacket {
	static struct = {
		movementTypeId: 'uint8',
		position: SVector3,
		velocity: SVector3,
		movementDriverParamType: 'int32',
	};
	reader(buffer) {
		super.reader(buffer);

		if (this.movementDriverParamType == 1)
			this.movementDriverHomingData = buffer.read(MovementDriverHomingData);
	}
	writer(buffer) {
		this.movementDriverParamType = !!this.movementDriverHomingData;

		super.writer(buffer);

		if (this.movementDriverParamType == 1)
			buffer.write(MovementDriverHomingData, this.movementDriverHomingData);
	}
}
