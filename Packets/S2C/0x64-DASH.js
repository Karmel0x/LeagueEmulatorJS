var BasePacket = require('../BasePacket');
const MovementDataWithSpeed = require('../SharedStruct/MovementDataWithSpeed');


module.exports = class extends BasePacket {//S2C.DASH
	struct = {
		SyncID: 'int32',
		count: 'int16',
	}
	writer(buffer){
        this.count = this.count || 1;
		super.writer(buffer);

		MovementDataWithSpeed.writer(buffer, this);
	}
	reader(buffer){
		super.reader(buffer);

		MovementDataWithSpeed.reader(buffer, this);
	}
};
