var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//LOW_PRIORITY.CHAR_STATS
	struct = {
		SyncID: 'int32',
		count: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);
		this.ReplicationData = [];
		for(let i = 0; i < this.count; i++){
			this.ReplicationData[i] = buffer.readobj({
				primaryIdArray: 'uint8',
				UnitNetID: 'uint32',
			});
			this.ReplicationData[i].Data = {};
			for(let primaryId = 0; primaryId < 6; primaryId++){
				if((this.ReplicationData[i].primaryIdArray & (1 << primaryId)) == 0)
					continue;
					
				var Data = {};
				Data.seconadaryIdArray = buffer.read1('uint32');
				Data.dataCount = buffer.read1('uint8');
				Data.data = buffer.readobj(['uint8', Data.dataCount]);
				this.ReplicationData[i].Data[primaryId] = Data;
			}
		}
	}
};
