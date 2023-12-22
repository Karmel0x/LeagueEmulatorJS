import BasePacket from '../BasePacket';


export default class BuffAdd2 extends BasePacket {
	static struct = {
		buffSlot: 'uint8',
		buffType: 'uint8',
		count: 'uint8',
		isHidden: 'uint8',
		buffNameHash: 'uint32',
		packageHash: 'uint32',
		runningTime: 'float',
		duration: 'float',
		casterNetId: 'uint32',
	};
}
