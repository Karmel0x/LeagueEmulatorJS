import ExtendedPacket from '../ExtendedPacket.js';


export default class SetCanSurrender extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			canSurrender: 1,
		}],
	};
}
