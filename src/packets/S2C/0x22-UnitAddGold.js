const BasePacket = require('../BasePacket');


module.exports = class UnitAddGold extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		sourceNetId: 'uint32',
		goldAmount: 'float',
	}
};
