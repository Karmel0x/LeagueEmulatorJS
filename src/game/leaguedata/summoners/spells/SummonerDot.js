import _Spell from '../../../datamethods/spells/_Spell.js';


export default class SummonerDot extends _Spell {
	summonerSpellKey = 14;
	summonerSpellName = 'Ignite';
	spellHash = 104222500;

	cooldown = 180;
	cost = 0;
	range = 600;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
