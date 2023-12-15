import ExtendedPacket from '../ExtendedPacket.js';


export default class UpdateSpellToggle extends ExtendedPacket {
	static struct = {
		spellSlot: 'int32',
		bitfield: ['bitfield', {
			toggleValue: 1,
		}],
	};
}
