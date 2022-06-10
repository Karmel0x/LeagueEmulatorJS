const BasePacket = require('../BasePacket');


module.exports = class ReplaceObjectiveText extends BasePacket {
	static struct = {
		textId: 'string0',//128
	}
};
