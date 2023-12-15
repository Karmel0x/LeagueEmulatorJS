import BasePacket from '../BasePacket.js';

export default class UpgradeSpellAns extends BasePacket {
	static struct = {
		slot: 'uint8',
		spellLevel: 'uint8',
		skillPoints: 'uint8',
	};
}
