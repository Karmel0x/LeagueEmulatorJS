var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');
var CastInfo = require('../SharedStruct/CastInfo');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Position: Vector3,
		CasterPosition: Vector3,
		Direction: Vector3,
		Velocity: Vector3,
		StartPoint: Vector3,
		EndPoint: Vector3,
		UnitPosition: Vector3,
		TimeFromCreation: 'float',
		Speed: 'float',
		LifePercentage: 'float',
		TimedSpeedDelta: 'float',
		TimedSpeedDeltaTime: 'float',
		bitfield: ['bitfield', {
			Bounced: 1,
		}],
		CastInfo: JSON.parse(JSON.stringify(CastInfo)),
	}
};
