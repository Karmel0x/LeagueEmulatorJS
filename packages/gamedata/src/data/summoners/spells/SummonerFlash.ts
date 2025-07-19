import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import _Spell, { type CastData } from '@repo/scripting/base/spell';


export default class SummonerFlash extends _Spell {
	summonerSpellKey = 4;
	summonerSpellName = 'Flash';
	//spellHash = 105475752;

	cooldown = 0;//300;
	cost = 0;
	range = 425;


	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		if (!castData.packet)
			return;

		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		let pos = new Vector2(targetPosition.x, targetPosition.y);
		owner.moving.teleport(pos);
	}

}
