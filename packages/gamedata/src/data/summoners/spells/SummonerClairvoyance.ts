import Server from '@repo/gameserver/src/app/server';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


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
