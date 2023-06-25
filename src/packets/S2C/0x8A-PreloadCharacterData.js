const BasePacket = require('../BasePacket');

module.exports = class PreloadCharacterData extends BasePacket {
	static struct = {
		skinId: 'int32',
		skinName: 'string0',//64
	}
};
