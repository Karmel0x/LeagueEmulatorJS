var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		NetNodeID: 'uint8',
		SkinID: 'int32',
		InternalName: ['char', 64],
		CharacterName: 'string0',
	}
};
