import BasePacket from '../BasePacket';


export default class ResumePacket extends BasePacket {
	static struct = {
		clientId: 'uint8',
		bitfield: ['bitfield', {
			delayed: 1,
		}],
	};
}
