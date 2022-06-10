var ExtendedPacket = require('../ExtendedPacket');


module.exports = class TeamUpdateDragonBuffCount extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			teamIsOrder: 1,
		}],
		Unknown: 'uint32',
		count: 'uint32',
	}
};
