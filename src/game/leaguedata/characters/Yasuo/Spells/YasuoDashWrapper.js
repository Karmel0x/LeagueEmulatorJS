
import HashString from '../../../../../functions/HashString.js';
import PositionHelper from '../../../../../gameobjects/extensions/Measure/index.js';
import _Spell from '../../../../datamethods/spells/_Spell.js';



export default class YasuoDashWrapper extends _Spell {
	castRange = 475;
	movingSpell = true;

	/**
	 * @todo probably need to create missile cause missileNetId differs from spellNetId
	 */
	onCast(spellData) {
		//spellData.maxRangePosition = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		this.castInfo.missileNetId = 1073743444;

		this.owner.packets.SetAnimStates([
			['RUN', 'Spell3']
		]);
		this.owner.callbacks.collision[spellData.spellCast.netId] = {
			options: {
				range: this.owner.stats.collisionRadius,
			},
			function: (target) => {
				if (target.netId != spellData.packet.targetNetId)
					return;

				delete this.owner.callbacks.collision[spellData.spellCast.netId];
				this.hit(target);
			}
		};

		this.owner.moving.dashTo(spellData.packet.position, {
			speed: 750 + this.owner.stats.moveSpeed.total * 0.6,
			range: 475, minRange: 475,
			callback: () => {
				if (this.owner.callbacks.collision[spellData.spellCast.netId])
					delete this.owner.callbacks.collision[spellData.spellCast.netId];
				//else
				//	this.hit_TargetNetId(packet.targetNetId);

				this.owner.packets.SetAnimStates([
					['Spell3', 'RUN']
				]);
			}
		});

	}

	hit(target) {
		this.owner.combat.attack(target);
	}
}
