var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		MissileNetID: 'uint32',
		flags: 'uint8',
        //this.KeepAnimating = (flags & 1) != 0;
        //this.DestroyMissile = (flags & 2) != 0;
        //this.OverrideVisibility = (flags & 4) != 0;
        //this.IsSummonerSpell = (flags & 8) != 0;
        //this.ForceDoClient = (flags & 16) != 0;
	}
};
