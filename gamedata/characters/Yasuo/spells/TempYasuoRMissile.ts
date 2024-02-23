
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';


export default class TempYasuoRMissile extends _Spell {
	isProjectile = true;

	castInfo = {
		spellSlot: 50,
		target: [{
			unit: 0,
			hitResult: 1,
		}],
		bitfield: {
			isForceCastingOrChannel: true,
			isOverrideCastPosition: true,
		},
	};

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

}
