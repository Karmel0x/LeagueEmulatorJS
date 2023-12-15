import ExtendedPacket from '../ExtendedPacket.js';


export default class UnitSetSpellLevelOverrides extends ExtendedPacket {
	static struct = {
		spellMaxLevels: ['uint8', 4],
		spellUpgradeLevels: [['uint8', 6], 4],
	};
}
