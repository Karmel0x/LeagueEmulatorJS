
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import package1 from '../package';


export default class YasuoQ3Mis extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.es1;
	windup = 0.35;
	isMissile = true;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: 0.1,
		designerTotalTime: 1,
		isForceCastingOrChannel: true,
		ammoUsed: 0,
		targets: [],
	};

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const missile = spellVars.missile;
		if (!missile)
			return;

		//console.log(missile);
		missile.fire(missile.target);
	}
}
