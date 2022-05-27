var Vector3 = require('../SharedStruct/Vector3');

module.exports = {//BasicAttackData
	TargetNetId: 'uint32',
	ExtraTime: 'int8',//(ExtraTime - 128) / 100.0f
	MissileNextID: 'uint32',
	AttackSlot: 'int8',
	targetPosition: Vector3,
};
