
var BasePacket = require('../BasePacket');
var EventData = {
    
};

module.exports = class extends BasePacket {//S2C.ANNOUNCE
	struct = {
		EventID: 'uint8',
		Source: 'uint32',
		EventData: EventData,
	}
};
