var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		DamageResultType: 'uint8',
		dummy: 'uint8',
		DamageType: 'uint8',
		Damage: 'float',
		TargetNetID: 'uint32',
		SourceNetID: 'uint32',
	}
};
