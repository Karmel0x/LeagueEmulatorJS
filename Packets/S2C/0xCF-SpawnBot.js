var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetId: 'uint32',
		NetNodeID: 'uint8',
		Position: Vector3,
		BotRank: 'uint8',
		bitfield_TeamID: 'uint16',//(bitfield & 0x1FF)
		SkinID: 'int32',
		Name: ['char', 64],
		SkinName: 'string0',//64
	}
};
