const ExtendedPacket = require('../ExtendedPacket');


module.exports = class ReplayOnly_MultiKillCountUpdate extends ExtendedPacket {
	static struct = {
		ownerNetId: 'uint32',
		multiKillCount: 'uint8',
	}
};
