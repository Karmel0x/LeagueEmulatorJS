import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class SummonerExhaust extends _Spell {
	summonerSpellKey = 3;
	summonerSpellName = 'Exhaust';
	//spellHash = 145275620;

	cooldown = 210;
	cost = 0;
	range = 650;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
