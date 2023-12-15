import _Spell from '../../../datamethods/spells/_Spell.js';


export default class SummonerTeleport extends _Spell {
	summonerSpellKey = 12;
	summonerSpellName = 'Teleport';
	spellHash = 5182308;

	cooldown = 300;
	cost = 0;
	range = 25000;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
