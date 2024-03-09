import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';


export default class SummonerOdinGarrison extends _Spell {
	summonerSpellKey = 17;
	summonerSpellName = 'Garrison';
	spellHash = 226996206;

	cooldown = 210;
	cost = 0;
	range = 1250;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
