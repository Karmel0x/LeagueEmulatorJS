var BasePacket = require('../BasePacket');
var BasicAttackData = require('../SharedStruct/BasicAttackData');


module.exports = class extends BasePacket {//S2C.NEXT_AUTO_ATTACK
	struct = {
		Attack: BasicAttackData,
	}
};
