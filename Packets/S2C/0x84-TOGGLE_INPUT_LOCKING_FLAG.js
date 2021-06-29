var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		InputLockFlags: 'uint32',
		bitfield: 'uint8',
        //this.Value = (bitfield & 1) != 0;
	}
};
