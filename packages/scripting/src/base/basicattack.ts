
import Missile from "@repo/gameserver/src/gameobjects/missiles/missile";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import { Vector2 } from "@repo/geometry";
import { DamageSource, DamageType } from "@repo/packets/shared/SDeathData";
import type { CastVars } from "../load/spell-cast";
import Spell, { type CastData } from "./spell";

export default class BasicAttack extends Spell {

	canCancel = true;

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const target = castData.target;
		if (!target)
			throw new Error('No target for basic attack');

		const targetPosition = target.position;// ?? castData.targetPosition;
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
		skillshot.eventEmitter.on('collisionUnit', (target2: AttackableUnit) => {
			if (target !== target2)
				return;

			if (owner === target2 || collidedWith.includes(target2.netId))
				return;

			collidedWith.push(target2.netId);

			if (!target2.combat)
				return;

			target2.combat.damage(owner, {
				damageAmount: 100,
				damageType: DamageType.physical,
				damageSource: DamageSource.spell,
			});
		});

		const targetPosition2 = new Vector2(targetPosition.x, targetPosition.y);
		skillshot.fire(targetPosition2);
		castVars.missile = skillshot;
	}

}
