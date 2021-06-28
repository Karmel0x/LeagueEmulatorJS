var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.CHAMPION_RESPAWN
	struct = {
		Vector3: Vector3,
	}
};
