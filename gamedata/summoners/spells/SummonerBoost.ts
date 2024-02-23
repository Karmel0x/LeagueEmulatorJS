import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';


export default class SummonerBoost extends _Spell {
	summonerSpellKey = 1;
	summonerSpellName = 'Cleanse';
	spellHash = 105717908;

	cooldown = 210;
	cost = 0;


	onCast(spellData) {
		super.onCast(spellData);

	}
}
