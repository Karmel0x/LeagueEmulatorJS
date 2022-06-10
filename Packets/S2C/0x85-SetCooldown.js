const BasePacket = require('../BasePacket');


module.exports = class SetCooldown extends BasePacket {
	static struct = {
		slot: 'uint8',
		bitfield: ['bitfield', {
			playVOWhenCooldownReady: 1,
			isSummonerSpell: 2,
		}],
		cooldown: 'float',
		maxCooldownForDisplay: 'float',
	}
};
