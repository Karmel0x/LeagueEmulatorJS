
import PrimaryPacket from '../PrimaryPacket.js';


export default class QuickChat extends PrimaryPacket {
	static struct = {
		clientId: 'int32',
		messageId: 'int16',
	};
	reader(buffer) {
		super.reader(buffer);

		this.extraBytes = buffer.read(['uint8', buffer.length - buffer.offset]);
	}
	writer(buffer) {
		super.writer(buffer);

		buffer.write(['uint8', this.extraBytes.length], this.extraBytes);
	}
}
