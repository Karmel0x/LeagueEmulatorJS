import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';


export default class SummonerBarrier extends _Spell {
	summonerSpellKey = 21;
	summonerSpellName = 'Barrier';
	spellHash = 214940034;

	cooldown = 210;
	cost = 0;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
