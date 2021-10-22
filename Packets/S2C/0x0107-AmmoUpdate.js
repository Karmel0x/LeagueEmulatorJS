var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		IsSummonerSpell: 'uint8',
		SpellSlot: 'int32',
		CurrentAmmo: 'int32',
		MaxAmmo: 'int32',
		AmmoRecharge: 'float',
		AmmoRechargeTotalTime: 'float',
	}
};
