var BasePacket = require('../BasePacket');
var EVENT_ARGUMENTS = require('../EVENT-ARGUMENTS');

const EventHistoryEntry = {
	timestamp: 'float',
	count: 'uint16',
	id: 'uint8',
	source: 'uint32',
};


module.exports = class extends BasePacket {//S2C.
	struct = {
		EventSourceType: 'uint8',
		KillerNetId: 'uint32',
		Duration: 'float',
		count: 'int32',
	}
	reader(buffer){
		super.reader(buffer);

		this.Entries = [];
		for(let i = 0; i < this.count; i++){
			this.Entries[i] = buffer.readobj(EventHistoryEntry);
			this.Entries[i].EventData = buffer.readobj(EVENT_ARGUMENTS[this.Entries[i].id] || EVENT_ARGUMENTS[0]);
		}
	}
	writer(buffer){
		super.writer(buffer);

		for(let i = 0; i < this.count; i++){
			buffer.writeobj(EventHistoryEntry, this.Entries[i]);
			buffer.writeobj(EVENT_ARGUMENTS[this.Entries[i].id] || EVENT_ARGUMENTS[0], this.Entries[i].EventData);
		}
	}
};
