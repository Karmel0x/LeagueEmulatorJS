var ExtendedPacket = require('../ExtendedPacket');


module.exports = class DebugLogGoldSources extends ExtendedPacket {
	static struct = {
		message: 'string0',//512
	}
};
