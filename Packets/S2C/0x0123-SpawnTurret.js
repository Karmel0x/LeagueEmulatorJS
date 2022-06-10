var ExtendedPacket = require('../ExtendedPacket');
const SVector3 = require('../SharedStruct/SVector3');


module.exports = class SpawnTurret extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		ownerNetId: 'uint32',
		netNodeId: 'uint8',
		objectName: ['char', 64],
		skinName: ['char', 64],
		skinId: 'int32',
		position: SVector3,
		modelDisappearOnDeathTime: 'float',
		bitfield: ['bitfield', {
			isInvulnerable: 1,
			isTargetable: 2,
		}],
		teamId: 'uint16',
		isTargetableToTeamSpellFlags: 'uint32',
	}
};
