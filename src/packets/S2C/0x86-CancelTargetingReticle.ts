import BasePacket from '../BasePacket';

export default class CancelTargetingReticle extends BasePacket {
	static struct = {
		spellSlot: 'uint8',
		bitfield: ['bitfield', {
			resetSpecified: 1,
		}],
	};
}
