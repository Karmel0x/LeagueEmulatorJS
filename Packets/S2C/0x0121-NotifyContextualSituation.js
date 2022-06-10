var ExtendedPacket = require('../ExtendedPacket');


module.exports = class NotifyContextualSituation extends ExtendedPacket {
	static struct = {
		situationNameHash: 'uint32',
	}
};
