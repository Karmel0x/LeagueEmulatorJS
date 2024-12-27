
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';


export default class YasuoDashWrapper extends _Spell {
	castRange = 475;
	canMoveWhenCast = true;

	/**
	 * @todo probably need to create missile cause missileNetId differs from spellNetId
	 */
	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		if (!castData.targetPosition)
			return;

		//const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(owner, castData.targetPosition, this.castRange);

		owner.packets.SetAnimStates([
			['RUN', 'Spell3']
		]);

		let collided = false;
		const onCollision = (target: AttackableUnit) => {
			if (target !== castData.target)
				return;

			if (collided)
				return;

			collided = true;

			target.combat.damage(owner, {
				damageAmount: 100,
				damageType: DamageType.physical,
				damageSource: DamageSource.spell,
			});
		};
		owner.eventEmitter.on('collision', onCollision);

		owner.eventEmitter.on('dashed', () => {
			owner.eventEmitter.off('collision', onCollision);
			//onCollision(castData.packet.targetNetId);//@todo

			owner.packets.SetAnimStates([
				['Spell3', 'RUN']
			]);
		});

		const targetPosition = new Vector2(castData.targetPosition.x, castData.targetPosition.y);
		owner.moving.dashTo(targetPosition, {
			speed: 750 + owner.stats.moveSpeed.total * 0.6,
			range: 475,
			minRange: 475,
		});
	}

}
