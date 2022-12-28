const BasePacket = require('../BasePacket');
const SVector2 = require('../SharedStruct/SVector2');

module.exports = class HeroReincarnateAlive extends BasePacket {
	static struct = {
		position: SVector2,
		parValue: 'float',
	}
};
