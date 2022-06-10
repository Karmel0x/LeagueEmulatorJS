const BasePacket = require('../BasePacket');


module.exports = class LineMissileHitList extends BasePacket {
	static struct = {
		targets_length: 'int16',
	}
	reader(buffer){
		super.reader(buffer);
		
		this.targets = buffer.readobj(['uint32', this.targets_length]);
	}
	writer(buffer){
		if(!this.targets || !this.targets.length || this.targets.length > 0x7FFF)
			return;

		this.targets_length = this.targets.length;
		
		super.writer(buffer);
		
		buffer.writeobj(['uint32', this.targets_length], this.targets);
	}
};
