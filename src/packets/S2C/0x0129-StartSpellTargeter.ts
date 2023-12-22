import ExtendedPacket from '../ExtendedPacket';


export default class StartSpellTargeter extends ExtendedPacket {
	static struct = {
		slot: 'uint32',
		targetTime: 'float',
	};
}
