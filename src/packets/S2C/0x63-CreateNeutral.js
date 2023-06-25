const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class CreateNeutral extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		position: SVector3,
		groupPosition: SVector3,
		faceDirectionPosition: SVector3,
		objectName: ['char', 64],
		skinName: ['char', 64],
		uniqueName: ['char', 64],
		spawnAnimationName: ['char', 64],
		teamId: 'uint32',
		damageBonus: 'int32',
		healthBonus: 'int32',
		minionRoamState: 'uint32',
		groupNumber: 'int32',
		buffSideTeamId: 'uint32',
		revealEvent: 'int32',
		initialLevel: 'int32',
		spawnDuration: 'float',
		spawnTime: 'float',
		behaviorTree: 'uint8',
		aiScript: 'string0',//32
	}
};
