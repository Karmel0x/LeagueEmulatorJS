
import { Vector2 } from "@repo/geometry";
import { DamageSource, DamageType } from "@repo/packets/shared/SDeathData";
import Missile from "../../gameobjects/missiles/missile";
import type AttackableUnit from "../../gameobjects/units/attackable-unit";
import Spell, { type CastData } from "./spell";

export default class BasicAttack extends Spell {

	canCancel = true;

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const castRange = 1000;//owner.stats.attackRange
		let skillshot = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 160,
				range: castRange,
				speed: 2000,
			},
		});

		let collidedWith: number[] = [];
		skillshot.eventEmitter.on('collision', (target: AttackableUnit) => {
			if (owner === target || collidedWith.includes(target.netId))
				return;

			collidedWith.push(target.netId);

			if (!target.combat)
				return;

			target.combat.damage(owner, {
				damageAmount: 100,
				damageType: DamageType.physical,
				damageSource: DamageSource.spell,
			});
		});

		const targetPosition2 = new Vector2(targetPosition.x, targetPosition.y);
		skillshot.fire(targetPosition2);
		spellVars.missile = skillshot;
	}

}
