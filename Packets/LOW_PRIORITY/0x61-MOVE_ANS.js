var BasePacket = require('../BasePacket');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

module.exports = class extends BasePacket {//LOW_PRIORITY.MOVE_ANS
    writer(buffer){
		super.writer(buffer);
        this.MovementDataNormal_length = 1;
        buffer.writeobj({
            SyncID: 'int32',
            MovementDataNormal_length: 'int16',
        }, this);
        
        for(let i = 0; i < this.MovementDataNormal_length; i++)
            if(this.Waypoints)
                MovementDataNormal.writer(buffer, this);
    }
    reader(buffer){
		super.reader(buffer);
        Object.assign(this, buffer.readobj({
            SyncID: 'int32',
            MovementDataNormal_length: 'int16',
        }));
        
        for(let i = 0; i < this.MovementDataNormal_length; i++)
            MovementDataNormal.reader(buffer, this);
    }
};
