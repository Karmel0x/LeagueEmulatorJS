var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
        //this.Physical = (bitfield & 1) != 0;
        //this.Magical = (bitfield & 2) != 0;
        //this.StopShieldFade = (bitfield & 4) != 0;
		Amount: 'float',
	}
};
