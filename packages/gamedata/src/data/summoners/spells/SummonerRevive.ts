import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerRevive extends _Spell {
	summonerSpellKey = 10;
	summonerSpellName = 'Revive';
	//spellHash = 97039269;

	cooldown = 510;
	cost = 0;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}

}
