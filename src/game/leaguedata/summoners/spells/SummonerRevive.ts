import _Spell from '../../../datamethods/spells/_Spell';


export default class SummonerRevive extends _Spell {
	summonerSpellKey = 10;
	summonerSpellName = 'Revive';
	spellHash = 97039269;

	cooldown = 510;
	cost = 0;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
