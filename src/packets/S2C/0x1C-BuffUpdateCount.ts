import BasePacket from '../BasePacket';


export default class BuffUpdateCount extends BasePacket {
	static struct = {
		buffSlot: 'uint8',
		count: 'uint8',
		duration: 'float',
		runningTime: 'float',
		casterNetId: 'uint32',
	};
}
