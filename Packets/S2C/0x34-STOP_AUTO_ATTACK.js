var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		MissileNetId: 'uint32',
		flags: ['bitfield', {
			KeepAnimating: 1,
			DestroyMissile: 2,
			OverrideVisibility: 4,
			IsSummonerSpell: 8,
			ForceDoClient: 16,
		}],
	}
};
