import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import type { CastVars } from '@repo/scripting/load/spell-cast';


export default class SummonerExhaust extends _Spell {
	summonerSpellKey = 3;
	summonerSpellName = 'Exhaust';
	//spellHash = 145275620;

	cooldown = 210;
	cost = 0;
	range = 650;


	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

	}

}
