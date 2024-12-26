
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';

import package1 from '../package';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


export default class EzrealMysticShotMissile extends _Spell {
	packageHash = package1.packageHash;
	isProjectile = true;
	spellSlot = SlotId.Qm;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerTotalTime: 1,
		//cooldown: 2.1903247880352632e-39,
		ammoUsed: 0,
	};

	projectileData = {
		speed: 2000,
	};


	onCast(spellData: SpellData) {
		const missile = spellData.spellChain.missile;
		if (!missile) return;

		//console.log(missile);
		missile.fire(missile.target);
	}

}
