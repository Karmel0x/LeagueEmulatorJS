const BasePacket = require('../BasePacket');
var EVENT_ARGUMENTS = require('../EVENT-ARGUMENTS');


module.exports = class OnEvent extends BasePacket {
	static struct = {
		eventId: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		this.eventData = buffer.readobj(EVENT_ARGUMENTS[this.eventId] || EVENT_ARGUMENTS[0]);
	}
	writer(buffer){
		super.writer(buffer);

		buffer.writeobj(EVENT_ARGUMENTS[this.eventId] || EVENT_ARGUMENTS[0], this.eventData);
	}
};
