import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerMana extends _Spell {
	summonerSpellKey = 13;
	summonerSpellName = 'Clarity';
	//spellHash = 56980513;

	cooldown = 180;
	cost = 0;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
