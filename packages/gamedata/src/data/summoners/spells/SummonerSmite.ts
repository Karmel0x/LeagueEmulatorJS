import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


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
