var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		OwnerNetID: 'uint32',
		NetNodeID: 'uint8',
		Position: Vector3,
		SkinID: 'int32',
		CloneNetID: 'uint32',
		TeamID: 'uint16',
		bitfield: ['bitfield', {
			IgnoreCollision: 1,
			IsWard: 2,
			IsLaneMinion: 4,
			IsBot: 8,
			IsTargetable: 10,
		}],
		IsTargetableToTeamSpellFlags: 'uint32',
		VisibilitySize: 'float',
		Name: ['char', 64],
		SkinName: ['char', 64],
		InitialLevel: 'uint16',
		OnlyVisibleToNetID: 'uint32',
	}
};
