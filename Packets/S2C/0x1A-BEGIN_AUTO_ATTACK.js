var BasePacket = require('../BasePacket');
var BasicAttackData = require('../SharedStruct/BasicAttackData');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Attack: BasicAttackData,
		Position: Vector2,
	}
};
