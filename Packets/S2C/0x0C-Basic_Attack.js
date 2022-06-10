const BasePacket = require('../BasePacket');
var SBasicAttackData = require('../SharedStruct/SBasicAttackData');


module.exports = class Basic_Attack extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
	}
};
