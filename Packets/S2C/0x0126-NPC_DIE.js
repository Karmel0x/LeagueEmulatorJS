var ExtendedPacket = require('../ExtendedPacket');
const DeathData = require('../SharedStruct/DeathData');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		DeathData: DeathData,
	}
};
