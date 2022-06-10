const BasePacket = require('../BasePacket');

const SBuffInGroupReplace = {
	ownerNetId: 'uint32',
	casterNetId: 'uint32',
	slot: 'uint8',
};


module.exports = class BuffReplaceGroup extends BasePacket {
	static struct = {
		runningTime: 'float',
		duration: 'float',
		numInGroup: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		this.entries = buffer.readobj([SBuffInGroupReplace, this.numInGroup]);
	}
	writer(buffer){
		//if(!this.entries || !this.entries.length || this.entries.length > 0xFF)
		//	return;

		this.numInGroup = this.entries.length;

		super.writer(buffer);

		buffer.writeobj([SBuffInGroupReplace, this.numInGroup], this.entries);
	}
};
