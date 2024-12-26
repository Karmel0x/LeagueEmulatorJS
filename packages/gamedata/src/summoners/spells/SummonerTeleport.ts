import Server from '@repo/gameserver/src/app/server';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';


export default class SummonerTeleport extends _Spell {
	summonerSpellKey = 12;
	summonerSpellName = 'Teleport';
	spellHash = 5182308;

	cooldown = 300;
	cost = 0;
	range = Server.map.diagonal;


	onCast(spellData: SpellData) {
		super.onCast(spellData);

	}
}
