import ExtendedPacket from '../ExtendedPacket.js';


export default class StartSpellTargeter extends ExtendedPacket {
	static struct = {
		slot: 'uint32',
		targetTime: 'float',
	};
}
