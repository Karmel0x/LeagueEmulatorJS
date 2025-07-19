
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class TempYasuoRMissile extends _Spell {
	isMissile = true;

	castInfo: Partial<SCastInfoModel> = {
		spellSlot: 50,
		targets: [{
			unitNetId: 0,
			hitResult: 1,
		}],
		isForceCastingOrChannel: true,
		isOverrideCastPosition: true,
	};

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const missile = spellVars.missile;
		if (!missile) return;

		//console.log(missile);
		missile.fire(missile.target);
	}

}
