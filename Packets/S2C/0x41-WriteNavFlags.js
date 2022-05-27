var BasePacket = require('../BasePacket');
const Vector2 = require('../SharedStruct/Vector2');

var NavFlagCricle = {
	position: Vector2,
	Radius: 'float',
	Flags: 'uint32',
};


module.exports = class extends BasePacket {//S2C.
	struct = {
		SyncID: 'int32',
		size: 'int16',
	}
	reader(buffer){
		super.reader(buffer);

		this.NavFlagCricles = buffer.readobj([NavFlagCricle, (this.size / 16)]);
	}
	writer(buffer){
		this.size = this.size ?? (this.NavFlagCricles.length * 16);
		super.writer(buffer);

        buffer.writeobj([NavFlagCricle, (this.size / 16)], this.NavFlagCricles);
	}
};
