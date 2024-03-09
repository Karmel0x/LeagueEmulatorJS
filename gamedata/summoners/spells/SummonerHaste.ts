import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';


export default class SummonerHaste extends _Spell {
	summonerSpellKey = 6;
	summonerSpellName = 'Ghost';
	spellHash = 105565333;

	cooldown = 210;
	cost = 0;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
