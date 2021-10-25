var BasePacket = require('../BasePacket');
const Vector2 = require('../SharedStruct/Vector2');

module.exports = class extends BasePacket {//S2C.CHAMPION_RESPAWN
	struct = {
		Position: Vector2,
		PARValue: 'float',
	}
};
