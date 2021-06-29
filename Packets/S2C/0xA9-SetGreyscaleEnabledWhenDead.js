var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
		//this.Enabled = (bitfield & 1) != 0;
	}
};
