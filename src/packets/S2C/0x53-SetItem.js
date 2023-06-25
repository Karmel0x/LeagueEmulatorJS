const BasePacket = require('../BasePacket');
const SItemPacket = require('../sharedstruct/SItemPacket');


module.exports = class SetItem extends BasePacket {
	static struct = {
		item: SItemPacket,
	}
};
