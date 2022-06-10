var ExtendedPacket = require('../ExtendedPacket');


module.exports = class AmmoUpdate extends ExtendedPacket {
	static struct = {
		isSummonerSpell: 'bool',
		spellSlot: 'int32',
		currentAmmo: 'int32',
		maxAmmo: 'int32',
		ammoRecharge: 'float',
		ammoRechargeTotalTime: 'float',
	}
};
