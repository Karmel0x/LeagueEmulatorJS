var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		FadeId: 'int16',
		FadeTime: 'float',
		FadeTargetValue: 'float',
	}
};
