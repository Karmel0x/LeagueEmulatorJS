const BasePacket = require('../BasePacket');
const SVector2 = require('../sharedstruct/SVector2');

module.exports = class HeroReincarnateAlive extends BasePacket {
	static struct = {
		position: SVector2,
		parValue: 'float',
	}
};
