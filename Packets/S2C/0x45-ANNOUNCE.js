var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.ANNOUNCE
	struct = {
		id: 'uint8',
		source: 'uint32',
		//EventData: EventData,
		NetID: 'uint32',
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
