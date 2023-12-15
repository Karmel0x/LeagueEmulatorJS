import ExtendedPacket from '../ExtendedPacket.js';


export default class StopSpellTargeter extends ExtendedPacket {
	static struct = {
		slot: 'uint32',
	};
}
