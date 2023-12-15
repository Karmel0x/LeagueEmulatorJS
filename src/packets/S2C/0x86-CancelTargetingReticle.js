import BasePacket from '../BasePacket.js';

export default class CancelTargetingReticle extends BasePacket {
	static struct = {
		spellSlot: 'uint8',
		bitfield: ['bitfield', {
			resetSpecified: 1,
		}],
	};
}
