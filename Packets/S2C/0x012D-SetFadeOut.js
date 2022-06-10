var ExtendedPacket = require('../ExtendedPacket');


module.exports = class SetFadeOut extends ExtendedPacket {
	static struct = {
		fadeTime: 'float',
		fadeTargetValue: 'float',
	}
};
