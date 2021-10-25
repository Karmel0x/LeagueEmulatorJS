var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		Targets_length: 'int16',
	}
	reader(buffer){
		super.reader(buffer);
		
		this.Targets = buffer.readobj(['uint32', this.Targets_length]);
	}
	writer(buffer){
		this.Targets_length = this.Targets.length;
		super.writer(buffer);
		
		buffer.writeobj(['uint32', this.Targets_length], this.Targets);
	}
};
