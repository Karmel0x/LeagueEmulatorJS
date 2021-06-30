var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//C2S.
	struct = {
		Source: 'uint8',
		Destination: 'uint8',
	}
};
