import Server from '@repo/gameserver/src/app/server';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerClairvoyance extends _Spell {
	summonerSpellKey = 2;
	summonerSpellName = 'Clairvoyance';
	//spellHash = 159999845;

	cooldown = 55;
	cost = 0;
	range = Server.map.diagonal;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
