const BasePacket = require('../BasePacket');


module.exports = class FadeOutMainSFX extends BasePacket {
	static struct = {
		fadeTime: 'float',
	}
};
