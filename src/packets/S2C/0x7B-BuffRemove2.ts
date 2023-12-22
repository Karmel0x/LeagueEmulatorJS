import BasePacket from '../BasePacket';


export default class BuffRemove2 extends BasePacket {
	static struct = {
		buffSlot: 'uint8',
		buffNameHash: 'uint32',
		runTimeRemove: 'float',
	};
}
