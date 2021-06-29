var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		CommandID: 'uint32',
		TargetID: 'uint32',
		bitfield: 'uint8',
        //this.HighlightPlayerIcon = (bitfield & 1) != 0;
        //this.FromPing = (bitfield & 2) != 0;
	}
};
