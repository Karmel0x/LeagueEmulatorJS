import Server from '@repo/gameserver/src/app/server';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


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
