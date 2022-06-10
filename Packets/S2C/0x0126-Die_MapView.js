var ExtendedPacket = require('../ExtendedPacket');
const SDeathData = require('../SharedStruct/SDeathData');


module.exports = class Die_MapView extends ExtendedPacket {
	static struct = {
		deathData: SDeathData,
	}
};
