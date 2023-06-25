const BasePacket = require('../BasePacket');
const SDeathData = require('../sharedstruct/SDeathData');


module.exports = class Hero_Die extends BasePacket {
	static struct = {
		deathData: SDeathData,
	}
};
