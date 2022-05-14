var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		DamageResultType: 'uint8',
		dummy: 'uint8',
		DamageType: 'uint8',
		Damage: 'float',
		TargetNetId: 'uint32',
		SourceNetId: 'uint32',
	}
};
