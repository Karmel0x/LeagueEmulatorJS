var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		NetNodeID: 'uint8',
		Position: Vector3,
		BotRank: 'uint8',
		bitfield_TeamID: 'bitfield16',//(bitfield & 0x1FF)
		SkinID: 'int32',
		Name: 'string0',
		SkinName: 'string0',
	}
};
