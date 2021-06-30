var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Slot: 'uint8',
		bitfield: ['bitfield', {
			PlayVOWhenCooldownReady: 1,
			IsSummonerSpell: 2,
		}],
		Cooldown: 'float',
		MaxCooldownForDisplay: 'float',
	}
};
