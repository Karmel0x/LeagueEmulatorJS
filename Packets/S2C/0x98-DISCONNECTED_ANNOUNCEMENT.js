var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		bitfield: 'uint8',
        //this.Unknown1 = (bitfield & 1) != 0;
	}
};
