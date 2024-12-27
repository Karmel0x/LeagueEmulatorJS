import Server from '@repo/gameserver/src/app/server';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class SummonerTeleport extends _Spell {
	summonerSpellKey = 12;
	summonerSpellName = 'Teleport';
	//spellHash = 5182308;

	cooldown = 300;
	cost = 0;
	range = Server.map.diagonal;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
