var BasePacket = require('../BasePacket');
var EVENT_ARGUMENTS = require('../EVENT-ARGUMENTS');


module.exports = class extends BasePacket {//S2C.ANNOUNCE2
	struct = {
		id: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		this.EventData = buffer.readobj(EVENT_ARGUMENTS[this.id] || EVENT_ARGUMENTS[0]);
	}
	writer(buffer){
		super.writer(buffer);

		buffer.writeobj(EVENT_ARGUMENTS[this.id] || EVENT_ARGUMENTS[0], this.EventData);
	}
};
