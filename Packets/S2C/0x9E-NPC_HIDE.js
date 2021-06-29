var BasePacket = require('../BasePacket');
var DeathData = require('../SharedStruct/DeathData');


module.exports = class extends BasePacket {//S2C.
	struct = {
		DeathData: DeathData,
	}
};
