const BasePacket = require('../BasePacket');


module.exports = class SetFadeOut_Pop extends BasePacket {
	static struct = {
		stackId: 'int16',
	}
};
