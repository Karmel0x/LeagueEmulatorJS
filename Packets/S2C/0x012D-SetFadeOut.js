var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		FadeTime: 'float',
		FadeTargetValue: 'float',
	}
};
