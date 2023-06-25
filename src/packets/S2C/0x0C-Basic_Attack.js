const BasePacket = require('../BasePacket');
const SBasicAttackData = require('../sharedstruct/SBasicAttackData');


module.exports = class Basic_Attack extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
	}
};
