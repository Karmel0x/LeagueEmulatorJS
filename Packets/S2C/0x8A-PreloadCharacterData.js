var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SkinID: 'int32',
		SkinName: 'string0',
	}
};
