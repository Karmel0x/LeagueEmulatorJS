import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerHaste extends _Spell {
	summonerSpellKey = 6;
	summonerSpellName = 'Ghost';
	//spellHash = 105565333;

	cooldown = 210;
	cost = 0;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
