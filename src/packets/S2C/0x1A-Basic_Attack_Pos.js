const BasePacket = require('../BasePacket');
const SBasicAttackData = require('../sharedstruct/SBasicAttackData');
const SVector2 = require('../sharedstruct/SVector2');


module.exports = class Basic_Attack_Pos extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
		position: SVector2,
	}
};
