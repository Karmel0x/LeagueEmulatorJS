import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';


export default class SummonerSmite extends _Spell {
	summonerSpellKey = 11;
	summonerSpellName = 'Smite';
	spellHash = 106858133;

	cooldown = 90;
	cost = 0;
	range = 760;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
