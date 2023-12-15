import BasePacket from '../BasePacket.js';

export default class UpgradeSpellReq extends BasePacket {
	static struct = {
		slot: 'uint8',
		bitfield: ['bitfield', {
			isEvolve: 1,
		}],
	};
}
