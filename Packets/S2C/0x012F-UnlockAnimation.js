var ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnlockAnimation extends ExtendedPacket {
	static struct = {
		animationName: 'string0',//64
	}
};
