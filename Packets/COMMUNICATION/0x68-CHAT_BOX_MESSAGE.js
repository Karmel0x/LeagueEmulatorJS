const ChatType = {
	ALL: 0,
	TEAM: 1,
};
var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//COMMUNICATION.CHAT_BOX_MESSAGE
	struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	struct = {
		ClientID: 'int32',
		netId: 'uint32',
		Localized: 'uint8',
		ChatType: 'uint32',

		paramsSize: 'int32',
		messageSize: 'int32',
		pars: ['uint8', 32],
		//msg: ['char', 'messageSize'],
		//pad1: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);
		this.msg = buffer.readobj(['char', this.messageSize]);
		this.pad1 = buffer.read1('uint8');
	}
	writer(buffer){
		super.writer(buffer);
		buffer.writeobj(['char', this.messageSize], this.msg);
		buffer.write1('uint8', this.pad1 || 0);
	}
};
