const ChatTypes = {
	ALL: 0,
	TEAM: 1,
};
import PrimaryPacket from '../PrimaryPacket';


/**
 * @todo localized strings
 */
export default class Chat extends PrimaryPacket {
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
	};
	reader(buffer) {
		super.reader(buffer);
		this.msg = buffer.read(['char', this.messageSize]);
		this.pad1 = buffer.read('uint8');
		//console.log(this.pars, this.msg);
	}
	writer(buffer) {
		if (!this.msg || !this.msg.length)
			return;
		if (this.msg.length > 0xFFFF)
			this.msg = this.msg.slice(0, 0xFFFF);

		this.messageSize = this.msg.length;

		super.writer(buffer);

		buffer.write(['char', this.messageSize], this.msg);
		buffer.write('uint8', this.pad1 || 0);
		//console.log(this.pars, this.msg);
	}
}
