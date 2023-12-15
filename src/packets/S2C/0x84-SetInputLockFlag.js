import BasePacket from '../BasePacket.js';


export default class SetInputLockFlag extends BasePacket {
	static struct = {
		inputLockFlags: 'uint32',
		bitfield: ['bitfield', {
			value: 1,
		}],
	};
}
