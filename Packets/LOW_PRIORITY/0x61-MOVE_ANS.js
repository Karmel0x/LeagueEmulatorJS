var BasePacket = require('../BasePacket');
var MovementDataNormal = require('../SharedStruct/MovementDataNormal');

module.exports = class extends BasePacket {//LOW_PRIORITY.MOVE_ANS
	struct = {
		SyncID: 'int32',
		count: 'int16',
	}
    writer(buffer){
        this.SyncID = this.SyncID || performance.now();
        this.MovementData = this.MovementData || [this];
        this.count = this.count || this.MovementData.length;
		super.writer(buffer);

        for(let i = 0; i < this.count; i++)
            MovementDataNormal.writer(buffer, this.MovementData[i]);
    }
    reader(buffer){
		super.reader(buffer);
        
        this.MovementData = [];
        for(let i = 0; i < this.count; i++)
            this.MovementData[i] = MovementDataNormal.reader(buffer);
    }
};
