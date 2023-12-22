import BasePacket from '../BasePacket';


export default class BuffReplace extends BasePacket {
	static struct = {
		buffSlot: 'uint8',
		runningTime: 'float',
		duration: 'float',
		casterNetId: 'uint32',
	};
}
