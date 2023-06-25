const BasePacket = require('../BasePacket');


module.exports = class ChangeCharacterVoice extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
		voiceOverride: 'string0',//64
	}
};
