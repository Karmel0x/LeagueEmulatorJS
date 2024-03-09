import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';


export default class SummonerBoost extends _Spell {
	summonerSpellKey = 1;
	summonerSpellName = 'Cleanse';
	spellHash = 105717908;

	cooldown = 210;
	cost = 0;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
