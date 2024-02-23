
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';

import package1 from '../package';


export default class EzrealMysticShotMissile extends _Spell {
	packageHash = package1.packageHash;
	isProjectile = true;
	spellSlot = SlotId.Qm;

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
