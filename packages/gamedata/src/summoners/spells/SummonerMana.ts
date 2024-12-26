import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';


export default class SummonerMana extends _Spell {
	summonerSpellKey = 13;
	summonerSpellName = 'Clarity';
	spellHash = 56980513;

	cooldown = 180;
	cost = 0;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
