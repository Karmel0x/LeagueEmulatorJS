
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import package1 from '../package';


export default class YasuoQ3Mis extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Qm;
	windup = 0.35;
	isProjectile = true;

	castInfo = {
		designerCastTime: 0.1,
		designerTotalTime: 1,
		bitfield: {
			isForceCastingOrChannel: true,
		},
		ammoUsed: 0,
		target: [],
	};

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}
}
