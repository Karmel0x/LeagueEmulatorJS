import Server from '@repo/gameserver/src/app/server';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';


export default class SummonerClairvoyance extends _Spell {
	summonerSpellKey = 2;
	summonerSpellName = 'Clairvoyance';
	spellHash = 159999845;

	cooldown = 55;
	cost = 0;
	range = Server.map.diagonal;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
