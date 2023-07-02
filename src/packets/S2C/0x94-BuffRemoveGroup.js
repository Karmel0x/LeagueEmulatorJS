const BasePacket = require('../BasePacket');

const BuffRemoveGroupEntry = {
	ownerNetId: 'uint32',
	slot: 'uint8',
	runTimeRemove: 'float',
};

module.exports = class BuffRemoveGroup extends BasePacket {
	static struct = {
		buffNameHash: 'uint32',
		count: 'uint8',
	}
	reader(buffer) {
		super.reader(buffer);

		this.entries = buffer.readobj([BuffRemoveGroupEntry, this.count]);
	}
	writer(buffer) {
		if (!this.entries || !this.entries.length || this.entries.length > 0xFF)
			return;

		this.count = this.entries.length;

		super.writer(buffer);

		buffer.writeobj([BuffRemoveGroupEntry, this.count], this.entries);
	}
};
