const BasePacket = require('../BasePacket');


var BuffUpdateCountGroupEntry = {
    ownerNetId: 'uint32',
    casterNetId: 'uint32',
    buffSlot: 'uint8',
    count: 'uint8',
};

module.exports = class BuffUpdateCountGroup extends BasePacket {
	static struct = {
		duration: 'float',
		runningTime: 'float',
		count: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		this.entries = buffer.readobj([BuffUpdateCountGroupEntry, this.count]);
	}
	writer(buffer){
		//if(!this.entries || !this.entries.length || this.entries.length > 0xFF)
		//	return;

		this.count = this.entries.length;

		super.writer(buffer);

		buffer.writeobj([BuffUpdateCountGroupEntry, this.count], this.entries);
	}
};
