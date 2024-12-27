import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class SummonerOdinGarrison extends _Spell {
	summonerSpellKey = 17;
	summonerSpellName = 'Garrison';
	//spellHash = 226996206;

	cooldown = 210;
	cost = 0;
	range = 1250;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
