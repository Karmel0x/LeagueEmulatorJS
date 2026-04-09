import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import _Spell, { type CastData } from "@repo/scripting/base/spell";
import type { CastVars } from "@repo/scripting/load/spell-cast";

const ItemSpells = {
	1: class ItemSpell extends _Spell {
		//static spellHash = 0;
		onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

		}
	},
	3340: class ItemSpell extends _Spell {
		//static spellHash = 0;
		onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

		}
	},
	2003: class ItemSpell extends _Spell {
		//static spellHash = 0;
		onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

		}
	}
};

export default ItemSpells;
