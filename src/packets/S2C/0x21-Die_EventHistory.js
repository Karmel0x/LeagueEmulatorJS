const BasePacket = require('../BasePacket');
const EVENT_ARGUMENTS = require('../EVENT-ARGUMENTS');

const EventHistoryEntry = {
	timestamp: 'float',
	count: 'uint16',
	id: 'uint8',
	source: 'uint32',
};


module.exports = class Die_EventHistory extends BasePacket {
	static struct = {
		eventSourceType: 'uint8',
		killerNetId: 'uint32',
		duration: 'float',
		count: 'int32',
	}
	reader(buffer) {
		super.reader(buffer);

		this.entries = [];
		for (let i = 0; i < this.count; i++) {
			this.entries[i] = buffer.readobj(EventHistoryEntry);
			this.entries[i].eventData = buffer.readobj(EVENT_ARGUMENTS[this.entries[i].id] || EVENT_ARGUMENTS[0]);
		}
	}
	writer(buffer) {
		super.writer(buffer);

		for (let i = 0; i < this.count; i++) {
			buffer.writeobj(EventHistoryEntry, this.entries[i]);
			buffer.writeobj(EVENT_ARGUMENTS[this.entries[i].id] || EVENT_ARGUMENTS[0], this.entries[i].eventData);
		}
	}
};
