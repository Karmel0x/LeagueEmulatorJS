var ExtendedPacket = require('../ExtendedPacket');


module.exports = class CameraLock extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
		Unknown: 'float',
		Unknown2: 'float',
		Unknown3: 'float',
		bitfield2: ['bitfield', {
			Unknown: 1,
		}],
	}
};
