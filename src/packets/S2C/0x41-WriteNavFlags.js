const BasePacket = require('../BasePacket');
const SVector2 = require('../sharedstruct/SVector2');

const NavFlagCricle = {
	position: SVector2,
	radius: 'float',
	flags: 'uint32',
};


module.exports = class WriteNavFlags extends BasePacket {
	static struct = {
		syncId: 'int32',
		size: 'int16',
	}
	reader(buffer) {
		super.reader(buffer);

		this.navFlagCricles = buffer.readobj([NavFlagCricle, (this.size / 16)]);
	}
	writer(buffer) {
		if (!this.navFlagCricles || !this.navFlagCricles.length)
			return;

		this.size = this.navFlagCricles.length * 16;

		super.writer(buffer);

		buffer.writeobj([NavFlagCricle, (this.size / 16)], this.navFlagCricles);
	}
};
