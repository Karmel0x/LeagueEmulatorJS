var BasePacket = require('../BasePacket');
var EventData = {
    
};


module.exports = class extends BasePacket {//S2C.
	struct = {
		EventData: EventData,
	}
};
