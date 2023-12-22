import _Spell from '../../../datamethods/spells/_Spell';


export default class SummonerMana extends _Spell {
	summonerSpellKey = 13;
	summonerSpellName = 'Clarity';
	spellHash = 56980513;

	cooldown = 180;
	cost = 0;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
