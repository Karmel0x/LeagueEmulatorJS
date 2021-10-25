var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		NetNodeID: 'uint8',
		Position: Vector3,
		GroupPosition: Vector3,
		FaceDirectionPosition: Vector3,
		Name: ['char', 64],
		SkinName: ['char', 64],
		UniqueName: ['char', 64],
		SpawnAnimationName: ['char', 64],
		TeamID: 'uint32',
		DamageBonus: 'int32',
		HealthBonus: 'int32',
		MinionRoamState: 'uint32',
		GroupNumber: 'int32',
		BuffSideTeamID: 'uint32',
		RevealEvent: 'int32',
		InitialLevel: 'int32',
		SpawnDuration: 'float',
		SpawnTime: 'float',
		BehaviorTree: 'uint8',
		AIscript: 'string0',//32
	}
};
