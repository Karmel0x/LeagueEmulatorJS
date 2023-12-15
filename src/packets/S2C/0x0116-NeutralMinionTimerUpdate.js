import ExtendedPacket from '../ExtendedPacket.js';


export default class NeutralMinionTimerUpdate extends ExtendedPacket {
	static struct = {
		typeHash: 'int32',
		expire: 'float',
	};
}
