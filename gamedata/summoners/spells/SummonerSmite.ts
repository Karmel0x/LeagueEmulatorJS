import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';


export default class SummonerSmite extends _Spell {
	summonerSpellKey = 11;
	summonerSpellName = 'Smite';
	spellHash = 106858133;

	cooldown = 90;
	cost = 0;
	range = 760;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
