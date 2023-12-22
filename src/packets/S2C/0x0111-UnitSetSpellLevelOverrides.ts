import ExtendedPacket from '../ExtendedPacket';


export default class UnitSetSpellLevelOverrides extends ExtendedPacket {
	static struct = {
		spellMaxLevels: ['uint8', 4],
		spellUpgradeLevels: [['uint8', 6], 4],
	};
}
