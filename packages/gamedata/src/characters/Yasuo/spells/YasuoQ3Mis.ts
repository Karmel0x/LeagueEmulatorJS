
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import package1 from '../package';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


export default class YasuoQ3Mis extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.Qm;
	windup = 0.35;
	isProjectile = true;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: 0.1,
		designerTotalTime: 1,
		isForceCastingOrChannel: true,
		ammoUsed: 0,
		targets: [],
	};

	onCast(spellData: SpellData) {
		const missile = spellData.spellChain.missile;
		if (!missile)
			return;

		//console.log(missile);
		missile.fire(missile.target);
	}
}
