const BasePacket = require('../BasePacket');


module.exports = class Building_Die extends BasePacket {
	static struct = {
		attackerNetId: 'uint32',
		lastHeroNetId: 'uint32',
	}
};
