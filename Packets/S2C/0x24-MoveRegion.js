var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		RegionNetID: 'uint32',
		Position: Vector2,
	}
};
