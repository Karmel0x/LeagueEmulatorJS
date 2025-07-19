import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


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
