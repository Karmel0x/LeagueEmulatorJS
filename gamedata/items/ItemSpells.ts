import _Spell, { SpellData } from "@workspace/gameserver/src/game/basedata/spells/spell";

const ItemSpells = {
	1: class ItemSpell extends _Spell {
		static spellHash = 0;
		onCast(spellData: SpellData) {
			super.onCast(spellData);

		}
	},
	3340: class ItemSpell extends _Spell {
		static spellHash = 0;
		onCast(spellData: SpellData) {
			super.onCast(spellData);

		}
	},
	2003: class ItemSpell extends _Spell {
		static spellHash = 0;
		onCast(spellData: SpellData) {
			super.onCast(spellData);

		}
	}
};

export default ItemSpells;
