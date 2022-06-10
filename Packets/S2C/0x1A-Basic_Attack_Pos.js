const BasePacket = require('../BasePacket');
var SBasicAttackData = require('../SharedStruct/SBasicAttackData');
var SVector2 = require('../SharedStruct/SVector2');


module.exports = class Basic_Attack_Pos extends BasePacket {
	static struct = {
		attack: SBasicAttackData,
		position: SVector2,
	}
};
