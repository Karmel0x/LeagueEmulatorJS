var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Slot: 'uint8',
		bitfield: 'uint8',
        //this.PlayVOWhenCooldownReady = (bitfield & 0x01) != 0;
        //this.IsSummonerSpell = (bitfield & 0x02) != 0;
		Cooldown: 'float',
		MaxCooldownForDisplay: 'float',
	}
};
