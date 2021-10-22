var ExtendedPacket = require('../ExtendedPacket');
const Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		NetID: 'uint32',
		OwnerNetID: 'uint32',
		NetNodeID: 'uint8',
		Name: 'string0',
		SkinName: 'string0',
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
