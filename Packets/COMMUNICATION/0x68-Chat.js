const ChatTypes = {
	ALL: 0,
	TEAM: 1,
};
const BasePacket = require('../BasePacket');


/**
 * @todo localized strings
 */
module.exports = class Chat extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		clientId: 'int32',
		netId: 'uint32',
		localized: 'bool',
		chatType: 'uint32',

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
		//console.log(this.pars, this.msg);
	}
	writer(buffer){
		if(!this.msg || !this.msg.length)
			return;
		if(this.msg.length > 0xFFFF)
			this.msg = this.msg.slice(0, 0xFFFF);

		this.messageSize = this.msg.length;

		super.writer(buffer);

		buffer.writeobj(['char', this.messageSize], this.msg);
		buffer.write1('uint8', this.pad1 || 0);
		//console.log(this.pars, this.msg);
	}
};
