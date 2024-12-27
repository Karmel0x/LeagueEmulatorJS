
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import package1 from '../package';


export default class EzrealMysticShotMissile extends _Spell {
	packageHash = package1.packageHash;
	isMissile = true;
	spellSlot = SlotId.es1;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerTotalTime: 1,
		//cooldown: 2.1903247880352632e-39,
		ammoUsed: 0,
	};

	projectileData = {
		speed: 2000,
	};


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const missile = spellVars.missile;
		if (!missile) return;

		//console.log(missile);
		missile.fire(missile.target);
	}

}
