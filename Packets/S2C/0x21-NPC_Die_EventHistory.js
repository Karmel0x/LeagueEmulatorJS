var BasePacket = require('../BasePacket');


const EventHistory = {
	timestamp: 'float',
	count: 'uint16',
	id: 'uint8',
	source: 'uint32',

	NetID: 'uint32',
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		EventSourceType: 'uint8',
		KillerNetID: 'uint32',
		Duration: 'float',
		count: 'int32',

		//Entries: [EventHistory, 'count'],
	}
	reader(buffer){
		super.reader(buffer);

		if(buffer.off >= buffer.length)
			return;

		this.Unk1 = buffer.read1('uint32');
	}
	writer(buffer){
		super.writer(buffer);

		if(this.Unk1)
			buffer.write1('uint32', this.Unk1);
	}
};
