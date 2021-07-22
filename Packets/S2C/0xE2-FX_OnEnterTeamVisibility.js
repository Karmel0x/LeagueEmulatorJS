var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		VisibilityTeam: 'uint8',
	}
};
