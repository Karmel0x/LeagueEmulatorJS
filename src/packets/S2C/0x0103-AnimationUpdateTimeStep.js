const ExtendedPacket = require('../ExtendedPacket');


module.exports = class AnimationUpdateTimeStep extends ExtendedPacket {
	static struct = {
		updateTimeStep: 'float',
		animationName: 'string0',//64
	}
};
