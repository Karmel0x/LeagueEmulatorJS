import ExtendedPacket from '../ExtendedPacket';


export default class SetCanSurrender extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			canSurrender: 1,
		}],
	};
}
