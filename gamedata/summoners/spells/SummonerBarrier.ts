import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';


export default class SummonerBarrier extends _Spell {
	summonerSpellKey = 21;
	summonerSpellName = 'Barrier';
	spellHash = 214940034;

	cooldown = 210;
	cost = 0;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
