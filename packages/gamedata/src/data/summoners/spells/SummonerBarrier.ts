import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerBarrier extends _Spell {
	summonerSpellKey = 21;
	summonerSpellName = 'Barrier';
	//spellHash = 214940034;

	cooldown = 210;
	cost = 0;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
