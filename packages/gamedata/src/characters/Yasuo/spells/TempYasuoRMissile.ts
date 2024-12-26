
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


export default class TempYasuoRMissile extends _Spell {
	isProjectile = true;

	castInfo: Partial<SCastInfoModel> = {
		spellSlot: 50,
		targets: [{
			unit: 0,
			hitResult: 1,
		}],
		isForceCastingOrChannel: true,
		isOverrideCastPosition: true,
	};

	onCast(spellData: SpellData) {
		const missile = spellData.spellChain.missile;
		if (!missile) return;

		//console.log(missile);
		missile.fire(missile.target);
	}

}
