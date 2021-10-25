var BasePacket = require('../BasePacket');
const DeathData = require('../SharedStruct/DeathData');


module.exports = class extends BasePacket {//S2C.
	struct = {
		DeathData: DeathData,
	}
};
