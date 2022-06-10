
const BasePacket = require('../BasePacket');


module.exports = class QuickChat extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		clientId: 'int32',
		messageId: 'int16',
	}
	reader(buffer){
		super.reader(buffer);

		this.extraBytes = buffer.readobj(['uint8', buffer.length - buffer.off]);
	}
	writer(buffer){
		super.writer(buffer);

		buffer.writeobj(['uint8', this.extraBytes.length], this.extraBytes);
	}
};
