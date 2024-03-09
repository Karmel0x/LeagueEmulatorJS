
import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';
import { IDefendable } from '@workspace/gameserver/src/gameobjects/extensions/combat/defendable';
import GameObject from '@workspace/gameserver/src/gameobjects/game-object';
import { Vector2 } from 'three';


export default class YasuoDashWrapper extends _Spell {
	castRange = 475;
	canMoveWhenCast = true;

	/**
	 * @todo probably need to create missile cause missileNetId differs from spellNetId
	 */
	onCast(spellData: SpellData) {
		if (!spellData.targetPosition)
			return;

		//const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.targetPosition, this.castRange);
		this.castInfo.missileNetId = 1073743444;

		this.owner.packets.SetAnimStates([
			['RUN', 'Spell3']
		]);

		let collided = false;
		const onCollision = (target: GameObject) => {
			if (target != spellData.target)
				return;

			if (collided)
				return;

			collided = true;
			const defendableTarget = target as IDefendable;
			if (defendableTarget.combat) {
				this.hit(defendableTarget);
			}
		};
		this.owner.eventEmitter.on('collision', onCollision);

		this.owner.eventEmitter.on('dashed', () => {
			this.owner.eventEmitter.off('collision', onCollision);
			//onCollision(spellData.packet.targetNetId);//@todo

			this.owner.packets.SetAnimStates([
				['Spell3', 'RUN']
			]);
		});

		this.owner.moving.dashTo(spellData.targetPosition, {
			speed: 750 + this.owner.stats.moveSpeed.total * 0.6,
			range: 475,
			minRange: 475,
		});
	}

	hit(target: IDefendable) {
		this.owner.combat.attack(target);
	}
}
