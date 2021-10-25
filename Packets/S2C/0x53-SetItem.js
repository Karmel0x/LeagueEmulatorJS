var BasePacket = require('../BasePacket');
var ItemPacket = require('../SharedStruct/ItemPacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Item: ItemPacket,
	}
};
