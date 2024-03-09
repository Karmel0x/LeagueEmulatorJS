import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';


export default class SummonerRevive extends _Spell {
	summonerSpellKey = 10;
	summonerSpellName = 'Revive';
	spellHash = 97039269;

	cooldown = 510;
	cost = 0;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
