import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerSmite extends _Spell {
	summonerSpellKey = 11;
	summonerSpellName = 'Smite';
	//spellHash = 106858133;

	cooldown = 90;
	cost = 0;
	range = 760;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
