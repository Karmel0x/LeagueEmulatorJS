import _Spell from '../../../datamethods/spells/_Spell.js';


export default class SummonerOdinGarrison extends _Spell {
	summonerSpellKey = 17;
	summonerSpellName = 'Garrison';
	spellHash = 226996206;

	cooldown = 210;
	cost = 0;
	range = 1250;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
