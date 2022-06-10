const BasePacket = require('../BasePacket');


module.exports = class ColorRemapFX extends BasePacket {
	static struct = {
		isFadingIn: 'uint8',
		fadeTime: 'float',
		teamId: 'uint32',
		color: 'uint32',
		maxWeight: 'float',
	}
};
