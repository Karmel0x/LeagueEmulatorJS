import ExtendedPacket from '../ExtendedPacket.js';


export default class TeamUpdateDragonBuffCount extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			teamIsOrder: 1,
		}],
		Unknown: 'uint32',
		count: 'uint32',
	};
}
