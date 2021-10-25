var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		UpdateTimeStep: 'float',
		AnimationName: 'string0',//64
	}
};
