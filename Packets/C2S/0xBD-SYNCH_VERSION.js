var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.SYNCH_VERSION
	struct = {
		ClientID: 'int32',
		version: ['char', 256],
		//version: 'string0',
	}
	//reader(buffer){
	//	super.reader(buffer);
	//	this.unk = buffer.readobj(['char', 256 - (this.version.length + 1)]);
	//}
};
