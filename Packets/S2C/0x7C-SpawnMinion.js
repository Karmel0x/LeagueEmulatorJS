var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetId: 'uint32',
		OwnerNetId: 'uint32',
		NetNodeID: 'uint8',
		position: Vector3,
		SkinID: 'int32',
		CloneNetId: 'uint32',
		TeamID: 'uint16',
		bitfield: ['bitfield', {
			IgnoreCollision: 1,
			IsWard: 2,
			IsLaneMinion: 4,
			IsBot: 8,
			isTargetable: 10,
		}],
		IsTargetableToTeamSpellFlags: 'uint32',
		VisibilitySize: 'float',
		Name: ['char', 64],
		SkinName: ['char', 64],
		InitialLevel: 'uint16',
		OnlyVisibleToNetId: 'uint32',
	}
};
