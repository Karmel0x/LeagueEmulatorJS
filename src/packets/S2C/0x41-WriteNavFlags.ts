import BasePacket from '../BasePacket';
import SVector2 from '../sharedstruct/SVector2';

const NavFlagCricle = {
	position: SVector2,
	radius: 'float',
	flags: 'uint32',
};


export default class WriteNavFlags extends BasePacket {
	static struct = {
		syncId: 'int32',
		size: 'int16',
	};
	reader(buffer) {
		super.reader(buffer);

		this.navFlagCricles = buffer.read([NavFlagCricle, (this.size / 16)]);
	}
	writer(buffer) {
		if (!this.navFlagCricles || !this.navFlagCricles.length)
			return;

		this.size = this.navFlagCricles.length * 16;

		super.writer(buffer);

		buffer.write([NavFlagCricle, (this.size / 16)], this.navFlagCricles);
	}
}
