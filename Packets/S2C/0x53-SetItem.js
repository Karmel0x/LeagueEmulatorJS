const BasePacket = require('../BasePacket');
var SItemPacket = require('../SharedStruct/SItemPacket');


module.exports = class SetItem extends BasePacket {
	static struct = {
		item: SItemPacket,
	}
};
