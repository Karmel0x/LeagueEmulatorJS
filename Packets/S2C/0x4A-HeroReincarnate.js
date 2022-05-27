var BasePacket = require('../BasePacket');
const Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//S2C.
	struct = {
		position: Vector2,
		PARValue: 'float',
	}
};
