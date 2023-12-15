
import slotId from '../../../../../constants/slotId.js';
import _Spell from '../../../../datamethods/spells/_Spell.js';

import package1 from '../package.js';


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
