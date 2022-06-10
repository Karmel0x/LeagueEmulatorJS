var BasePacket = require('./BasePacket');


module.exports = class ExtendedPacket extends BasePacket {
	static struct_header = {
		cmd2: 'uint8',
		netId: 'uint32',
		cmd: 'uint16',
	}
	
	cmd2 = 0xFE;
};
