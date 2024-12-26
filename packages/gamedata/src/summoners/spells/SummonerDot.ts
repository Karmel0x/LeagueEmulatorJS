import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';


export default class SummonerDot extends _Spell {
	summonerSpellKey = 14;
	summonerSpellName = 'Ignite';
	spellHash = 104222500;

	cooldown = 180;
	cost = 0;
	range = 600;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
