var ExtendedPacket = require('../ExtendedPacket');
const Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		NetId: 'uint32',
		OwnerNetId: 'uint32',
		NetNodeID: 'uint8',
		Name: ['char', 64],
		SkinName: ['char', 64],
		SkinID: 'int32',
		Position: Vector3,
		ModelDisappearOnDeathTime: 'float',
		bitfield: ['bitfield', {
			IsInvulnerable: 1,
			IsTargetable: 2,
		}],
		TeamID: 'uint16',
		IsTargetableToTeamSpellFlags: 'uint32',
	}
};
