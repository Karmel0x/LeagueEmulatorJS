import BasePacket from '../BasePacket';

export default class UpgradeSpellReq extends BasePacket {
	static struct = {
		slot: 'uint8',
		bitfield: ['bitfield', {
			isEvolve: 1,
		}],
	};
}
