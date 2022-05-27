var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');
var CastInfo = require('../SharedStruct/CastInfo');


module.exports = class extends BasePacket {//S2C.SPAWN_PROJECTILE
	struct = {
		position: Vector3,
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
		bitfield_Bounced: 'uint8',
		CastInfo: JSON.parse(JSON.stringify(CastInfo)),//todo
	}
	writer(buffer){
		this.CastInfo.targetCount = this.CastInfo.target.length;
		this.CastInfo.size = 102 + this.CastInfo.targetCount * 5;

		super.writer(buffer);
	}
};
