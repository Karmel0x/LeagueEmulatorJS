import _Spell, { type CastData } from "@repo/gameserver/src/game/basedata/spell";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";

const ItemSpells = {
	1: class ItemSpell extends _Spell {
		//static spellHash = 0;
		onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

		}
	},
	3340: class ItemSpell extends _Spell {
		//static spellHash = 0;
		onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

		}
	},
	2003: class ItemSpell extends _Spell {
		//static spellHash = 0;
		onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

		}
	}
};

export default ItemSpells;
