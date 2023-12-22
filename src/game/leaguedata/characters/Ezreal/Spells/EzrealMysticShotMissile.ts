
import slotId from '../../../../../constants/slotId';
import _Spell from '../../../../datamethods/spells/_Spell';

import package1 from '../package';


export default class EzrealMysticShotMissile extends _Spell {
	packageHash = package1.packageHash;
	isProjectile = true;
	spellSlot = slotId.Qm;

	castInfo = {
		target: [],
		designerTotalTime: 1,
		//cooldown: 2.1903247880352632e-39,
		ammoUsed: 0,
	};
	projectileData = {
		speed: 2000,
	};


	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

}
