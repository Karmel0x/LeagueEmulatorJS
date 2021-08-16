var BasePacket = require('../BasePacket');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

module.exports = class extends BasePacket {//LOW_PRIORITY.MOVE_ANS
	struct = {
		SyncID: 'int32',
		count: 'int16',
	}
    writer(buffer){
        this.count = this.count || 1;
		super.writer(buffer);

        for(let i = 0; i < this.count; i++)
            if(this.Waypoints || this.WaypointsCC)
                MovementDataNormal.writer(buffer, this);
    }
    reader(buffer){
		super.reader(buffer);
        
        for(let i = 0; i < this.count; i++)
            MovementDataNormal.reader(buffer, this);
    }
};
