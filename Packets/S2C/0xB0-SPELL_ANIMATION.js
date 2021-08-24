var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		AnimationFlags: 'uint8',
		ScaleTime: 'float',
		StartProgress: 'float',
		SpeedRatio: 'float',
		AnimationName: 'string0',//['char', 64],
	}
};
