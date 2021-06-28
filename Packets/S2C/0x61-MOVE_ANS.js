var BasePacket = require('../BasePacket');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

module.exports = class extends BasePacket {//S2C.MOVE_ANS
    writer = function(buffer){
        this.MovementDataNormal_length = 1;
        buffer.writeobj({
            SyncID: 'int32',
            MovementDataNormal_length: 'int16',
        }, this);
        
        for(let i = 0; i < this.MovementDataNormal_length; i++)
            if(this.Waypoints)
                MovementDataNormal.writer(buffer, this);
    }
    reader = function(buffer){
        Object.assign(this, buffer.readobj({
            SyncID: 'int32',
            MovementDataNormal_length: 'int16',
        }));
        
        for(let i = 0; i < this.MovementDataNormal_length; i++)
            MovementDataNormal.reader(buffer, this);
    }
};
