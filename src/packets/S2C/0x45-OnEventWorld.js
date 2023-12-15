import BasePacket from '../BasePacket.js';
import EVENT_ARGUMENTS from '../EVENT-ARGUMENTS.js';


export default class OnEventWorld extends BasePacket {
	static struct = {
		eventId: 'uint8',
		source: 'uint32',
	};
	reader(buffer) {
		super.reader(buffer);

		this.eventData = buffer.read(EVENT_ARGUMENTS[this.eventId] || EVENT_ARGUMENTS[0]);
	}
	writer(buffer) {
		super.writer(buffer);

		buffer.write(EVENT_ARGUMENTS[this.eventId] || EVENT_ARGUMENTS[0], this.eventData);
	}
}
