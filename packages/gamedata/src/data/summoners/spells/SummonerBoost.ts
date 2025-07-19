import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerBoost extends _Spell {
	summonerSpellKey = 1;
	summonerSpellName = 'Cleanse';
	//spellHash = 105717908;

	cooldown = 210;
	cost = 0;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
