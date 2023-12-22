import ExtendedPacket from '../ExtendedPacket';


export default class StopSpellTargeter extends ExtendedPacket {
	static struct = {
		slot: 'uint32',
	};
}
