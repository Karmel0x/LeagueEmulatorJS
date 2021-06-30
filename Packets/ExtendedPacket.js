var BasePacket = require('./BasePacket');


module.exports = class extends BasePacket {//S2C.EXTENDED
	struct_header = {
		cmd: 'uint8',
		netId: 'uint32',
		cmd2: 'uint16',
	}
};
