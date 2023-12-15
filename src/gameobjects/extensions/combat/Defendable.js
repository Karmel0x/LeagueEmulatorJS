
import packets from '../../../packets/index.js';
import Server from '../../../app/Server.js';
import Team from '../traits/Team.js';

/**
 * Trait for units that can be attacked
 * @depends IStatOwner
 */
export default class Defendable {
	owner;

	/**
	 * 
	 * @param {import("../../GameObjects.js").DefendableUnit} owner 
	 */
	constructor(owner) {
		this.owner = owner;
	}

	/**
	 * 
	 * @param {import("../../GameObjects.js").AttackableUnit} source 
	 * @param {Object} damage
	 * @param {number} [damage.resultType]
	 * @param {number} [damage.type]
	 * @param {number} [damage.amount]
	 */
	UnitApplyDamage(source, damage) {
		const packet1 = new packets.UnitApplyDamage();
		packet1.netId = this.owner.netId;
		packet1.damageResultType = damage.resultType || UnitApplyDamage.DamageResultType.normal;
		packet1.unk1 = 125;
		packet1.damageType = damage.type || UnitApplyDamage.DamageType.mixed;
		packet1.damage = damage.amount || 0;
		packet1.targetNetId = this.owner.netId;
		packet1.sourceNetId = source.netId;
		this.owner.packets.toEveryone(packet1);
	}

	damageReductionFromArmor() {
		return 100 / (100 + this.owner.stats.armor.total);
	}

	/**
	 * 
	 * @param {import("../../GameObjects.js").AttackableUnit} source 
	 * @param {Object} dmg
	 * @param {number} dmg.ad
	 */
	damage(source, dmg) {
		//console.log('damage', dmg, this.health.current, this.health.total);
		dmg.ad = dmg.ad * this.damageReductionFromArmor();

		if (dmg.ad <= 0)
			return;

		// do not die while testing @todo remove it
		if (this.owner.type == 'Player')
			this.owner.stats.health.minimum = 1;

		this.owner.stats.health.current -= dmg.ad;

		if (this.owner.stats.health.current <= 0)
			this.die(source);

		this.UnitApplyDamage(source, {
			amount: dmg.ad,
		});

		this.owner.packets.OnEnterLocalVisibilityClient();
	}

	/**
	 * 
	 * @param {import("../../GameObjects.js").AttackableUnit} source 
	 */
	die(source) {
		this.owner.stats.health.current = 0;
		this.died = Date.now() / 1000;
		this.owner.onDie(source);
		Server.teams[Team.TEAM_MAX].vision(this.owner, false);
		this.owner.destructor();
	}

	died = 0;

	canBeAttacked() {
		return !this.died;
	}

	/**
	 * 
	 * @param {number} hp 
	 */
	heal(hp) {
		this.owner.stats.health.current += hp;
		this.owner.packets.OnEnterLocalVisibilityClient();
	}

	/**
	 * 
	 * @param {number} hpPercent 
	 */
	healPercent(hpPercent) {
		this.heal(this.owner.stats.health.total * hpPercent / 100);
	}

}
