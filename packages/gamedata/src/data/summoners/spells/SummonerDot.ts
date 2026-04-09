import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import type { CastVars } from '@repo/scripting/load/spell-cast';


export default class SummonerDot extends _Spell {
	summonerSpellKey = 14;
	summonerSpellName = 'Ignite';
	//spellHash = 104222500;

	cooldown = 180;
	cost = 0;
	range = 600;


	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

	}

}
