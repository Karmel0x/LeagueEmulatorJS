import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';


export default class SummonerExhaust extends _Spell {
	summonerSpellKey = 3;
	summonerSpellName = 'Exhaust';
	spellHash = 145275620;

	cooldown = 210;
	cost = 0;
	range = 650;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
