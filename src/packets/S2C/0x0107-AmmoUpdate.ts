import ExtendedPacket from '../ExtendedPacket';


export default class AmmoUpdate extends ExtendedPacket {
	static struct = {
		isSummonerSpell: 'bool',
		spellSlot: 'int32',
		currentAmmo: 'int32',
		maxAmmo: 'int32',
		ammoRecharge: 'float',
		ammoRechargeTotalTime: 'float',
	};
}
