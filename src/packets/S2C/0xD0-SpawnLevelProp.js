const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class SpawnLevelProp extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		skinId: 'int32',
		position: SVector3,
		facingDirection: SVector3,
		positionOffset: SVector3,
		scale: SVector3,
		team: 'uint16',
		rank: 'uint8',
		skillLevel: 'uint8',
		type: 'uint32',
		objectName: ['char', 64],
		propName: ['char', 64],
		//propName: 'string0',//64
	}
};
