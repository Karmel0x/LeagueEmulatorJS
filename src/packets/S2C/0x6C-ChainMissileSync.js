const BasePacket = require('../BasePacket');

module.exports = class ChainMissileSync extends BasePacket {
	static struct = {
		targetCount: 'int32',
		ownerNetworkId: 'uint32',
		//targetNetIds: ['uint32', 32],
	}
	reader(buffer){
		super.reader(buffer);

		this.targetNetIds = buffer.readobj(['uint32', this.targetCount]);
	}
	writer(buffer){
		//if(!this.targetNetIds || !this.targetNetIds.length || this.targetNetIds.length > 32)
		//	return;

		this.targetCount = this.targetNetIds.length;

		super.writer(buffer);
		
		buffer.writeobj(['uint32', this.targetCount], this.targetNetIds);
	}
};
