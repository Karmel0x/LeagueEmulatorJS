const BasePacket = require('../BasePacket');
const CMovementDataWithSpeed = require('../SharedStruct/CMovementDataWithSpeed');


module.exports = class WaypointGroupWithSpeed extends BasePacket {
	static struct = {
		syncId: 'int32',
		count: 'int16',
	}
	writer(buffer){
        this.syncId = this.syncId || performance.now();
        this.movementData = this.movementData || [this];
        this.count = this.count ?? this.movementData.length;
		super.writer(buffer);

        for(let i = 0; i < this.count; i++)
			CMovementDataWithSpeed.writer(buffer, this.movementData[i]);
	}
	reader(buffer){
		super.reader(buffer);

        this.movementData = [];
        for(let i = 0; i < this.count; i++)
            this.movementData[i] = CMovementDataWithSpeed.reader(buffer);
	}
};
