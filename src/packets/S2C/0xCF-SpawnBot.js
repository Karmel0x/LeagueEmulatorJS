const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class SpawnBot extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		position: SVector3,
		botRank: 'uint8',
		teamId: 'uint16',//(bitfield & 0x1FF)
		skinId: 'int32',
		objectName: ['char', 64],
		skinName: 'string0',//64
	}
};
