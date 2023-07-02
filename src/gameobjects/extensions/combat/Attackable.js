
const slotId = require("../../../constants/slotId");
const UnitList = require("../../../app/UnitList");
const Server = require("../../../app/Server");
const Defendable = require("./Defendable");
const Filters = require("../Filters");


/**
 * @typedef {import('../../units/Unit')} Unit
 */

/**
 * Trait for units that can attack
 * @depends IStatOwner, ISpellable
 */
module.exports = class Attackable extends Defendable {

	/**
	 * 
	 * @param {import("../../GameObjects").AttackableUnit} owner 
	 */
	constructor(owner) {
		super(owner);

		this.owner.on('respawn', () => {
			this.autoAttackLoop();
		});
	}

	castAttack(packet) {
		//let slot = packet.slot;
		//
		//if (slot < slotId.A || slot > slotId.A9)
		//	return;

		this.acquisitionManual = packet.targetNetId;
		this.autoAttackSoftToggle = true;
	}

	/**
	 * 
	 * @param {import("../../GameObjects").DefendableUnit} target 
	 */
	attack(target) {

		if (!target)
			return console.log('unit does not exist', target);

		if (!target.combat)
			return console.log('unit cannot be damaged', target.netId, target.constructor.name);

		//if(this.owner.team.id === target.team.team.id)
		//	return;

		console.log('BattleUnit.attack', this.owner.netId, target.netId);
		let dmg = {
			ad: 0,
			ap: 0,
		};
		dmg.ad += this.owner.stats.attackDamage.total;
		target.combat.damage(this.owner, dmg);
	}

	/**
	 * 
	 * @param {number} targetNetId 
	 */
	attackByNetId(targetNetId) {
		if (!targetNetId)
			return console.log('unit does not exist', targetNetId);

		let target = /** @type {import("../../GameObjects").DefendableUnit} */ (UnitList.unitsNetId[targetNetId]);
		return this.attack(target);
	}

	/** @type {?Unit} */
	attackTarget = null;
	autoAttackToggle = true;
	autoAttackSoftToggle = true;

	/** @type {?Unit} */
	_acquisitionManual = null;
	get acquisitionManual() {
		return this._acquisitionManual;
	}
	set acquisitionManual(target) {
		if (target && typeof target != 'object')
			target = UnitList.getUnitByNetId(target);

		this._acquisitionManual = target;
	}

	/**
	 * Get current target if in attackRange
	 * @returns 
	 */
	getCurrentAttackTargetIfInAcquisitionRange() {
		if (!this.attackTarget || !this.attackTarget.canBeAttacked())
			return null;

		if (!this.owner.measure['EDGE_TO_EDGE'].isInRange(this.attackTarget, this.owner.stats.attackRange.total || 400))
			return null;

		return this.attackTarget;
	}

	attackTargetUnitTypesOrder = ['Minion', 'Player', 'Turret', 'Inhibitor', 'Nexus'];
	/**
	 * Find new target in range, sort by type and distance
	 * @returns {?Unit}
	 */
	getNewAttackTarget() {
		let unitsInRange = this.owner.measure['EDGE_TO_EDGE'].filterByRange(this.owner.getEnemyUnits(), this.owner.stats.attackRange.total || 400);
		if (!unitsInRange.length)
			return null;

		let filters = this.owner.measure;
		filters.sortByDistance(unitsInRange);
		unitsInRange = Filters.filterByType(unitsInRange, this.attackTargetUnitTypesOrder);
		Filters.sortByType(unitsInRange, this.attackTargetUnitTypesOrder);
		return unitsInRange[0];
	}

	shouldAutoAttackNow() {
		if (!this.autoAttackToggle)
			return false;
		if (!this.autoAttackSoftToggle && this.owner.moving.waypoints?.length)
			return false;
		if (this.owner.callbacks.move?.dash)//@todo
			return false;
		return true;
	}

	/**
	 * Find target to attack or get previous target if still in range
	 * @returns {?Unit}
	 */
	findTargetInAcquisitionRange() {
		if (!this.shouldAutoAttackNow())
			return null;

		let target = this.getCurrentAttackTargetIfInAcquisitionRange();
		if (target)
			return target;

		target = this.getNewAttackTarget();
		if (target)
			return target;

		return null;
	}

	/**
	 * Set attackTarget to attack
	 * @param {Unit} target
	 */
	setAttackTarget(target) {
		if (this.attackTarget === target)
			return;

		this.attackTarget = target;

		//const AI_TargetHero = Server.network.createPacket('AI_TargetHero');
		//AI_TargetHero.netId = this.netId;
		//AI_TargetHero.targetNetId = target.netId;
		//this.packets.toEveryone(AI_TargetHero);
	}

	//FaceDirection() {
	//	const FaceDirection = Server.network.createPacket('FaceDirection');
	//	FaceDirection.netId = this.netId;
	//	FaceDirection.flags = { doLerpTime: true };
	//	FaceDirection.direction = new Vector3(-0.93, 0, -0.35);
	//	FaceDirection.lerpTime = 0.08;
	//	this.packets.toEveryone(FaceDirection, loadingStages.NOT_CONNECTED);
	//}

	canFollowTarget(target) {
		// todo: checks if target is visible, didn't died, ...
		return true;
	}
	getTargetInAcquisitionManual() {
		if (!this.acquisitionManual)
			return null;

		return this.acquisitionManual;
	}

	emitted_noTargetsInRange = false;
	/**
	 * Scan for enemy units in range and attack nearest one
	 */
	async attackInRange() {
		let target = this.getTargetInAcquisitionManual();
		if (!target) {
			target = this.findTargetInAcquisitionRange();
			if (!target) {
				if (!this.emitted_noTargetsInRange) {
					this.emitted_noTargetsInRange = true;
					this.owner.emit('noTargetsInRange');
				}
				return;
			}
		}
		this.emitted_noTargetsInRange = false;

		this.setAttackTarget(target);
		let casted = await this.owner.slots[slotId.A].cast({ target });
		if (casted) {
			//const InstantStop_Attack = Server.network.createPacket('InstantStop_Attack');
			//InstantStop_Attack.netId = this.netId;
			//InstantStop_Attack.flags = {
			//	keepAnimating: true,
			//};
			//this.owner.packets.toEveryone(InstantStop_Attack);

			const UnitSetLookAt = Server.network.createPacket('UnitSetLookAt');
			UnitSetLookAt.netId = this.owner.netId;
			UnitSetLookAt.lookAtType = UnitSetLookAt.constructor.LookAtType.Unit;
			UnitSetLookAt.targetPosition = {
				x: target.position.x,
				y: target.position.y,
				z: 10,
			};
			UnitSetLookAt.targetNetId = target.netId;
			this.owner.packets.toEveryone(UnitSetLookAt);

			this.owner.emit('afterBasicAttack');
		}

		//this.FaceDirection();
		//attackSlot.turretAttackProjectile(basicattack);
	}

	async autoAttackLoop() {
		if (!this.owner.slots[slotId.A])
			return console.log('unit is Attackable but has no basic attacks', this.owner.name);

		while (!this.died) {
			await this.attackInRange();
			await Promise.wait(100);
		}
	}

};
