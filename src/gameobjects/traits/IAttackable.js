
const slotId = require("../../constants/slotId");
const IStatOwner = require("./IStatOwner");
const ISpellable = require("./ISpellable");
const UnitList = require("../../app/UnitList");
const Server = require("../../app/Server");


/**
 * @typedef {import('../../gameobjects/GameObject')} GameObject
 * @typedef {import('../../gameobjects/units/Unit')} Unit
 */

/**
 * Trait for units that can attack
 * @mixin
 * @param {GameObject.<IStatOwner, ISpellable>} I
 */
module.exports = (I) => class IAttackable extends I {


	/**
	 * 
	 * @param {Unit | number} target | targetNetId 
	 */
	attack(target) {
		if (!target.netId)
			target = UnitList.unitsNetId[target];

		if (!target)
			return console.log('unit does not exist', target.netId, target);

		if (!target.damage)
			return console.log('unit cannot be damaged', target.netId, target.constructor.name);

		//if(this.teamId === target.teamId)
		//	return;

		console.log('BattleUnit.attack', this.netId, target.netId);
		var dmg = {
			ad: 0,
			ap: 0,
		};
		dmg.ad += this.attackDamage.total;
		target.damage(this, dmg);
	}

	/** @type {?Unit} */
	attackTarget = null;
	autoAttackToggle = true;
	autoAttackSoftToggle = true;

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

		if (!this.Filters('EDGE_TO_EDGE').isInRange(this.attackTarget, this.attackRange.total || 400))
			return null;

		return this.attackTarget;
	}

	attackTargetUnitTypesOrder = ['Minion', 'Player', 'Turret', 'Inhibitor', 'Nexus'];
	/**
	 * Find new target in range, sort by type and distance
	 * @returns {Unit}
	 */
	getNewAttackTarget() {
		var unitsInRange = this.Filters('EDGE_TO_EDGE').filterByRange(this.getEnemyUnits(), this.attackRange.total || 400);
		if (!unitsInRange.length)
			return null;

		var filters = this.Filters();
		filters.sortByDistance(unitsInRange);
		unitsInRange = filters.filterByType(unitsInRange, this.attackTargetUnitTypesOrder);
		filters.sortByType(unitsInRange, this.attackTargetUnitTypesOrder);
		return unitsInRange[0];
	}

	shouldAutoAttackNow() {
		if (!this.autoAttackToggle)
			return false;
		if (!this.autoAttackSoftToggle && this.waypoints?.length)
			return false;
		if (this.callbacks.move?.dash)//@todo
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

		var target = this.getCurrentAttackTargetIfInAcquisitionRange();
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

		//var AI_TargetHero = Server.network.createPacket('AI_TargetHero');
		//AI_TargetHero.netId = this.netId;
		//AI_TargetHero.targetNetId = target.netId;
		//this.sendTo_everyone(AI_TargetHero);
	}

	//FaceDirection() {
	//	var FaceDirection = Server.network.createPacket('FaceDirection');
	//	FaceDirection.netId = this.netId;
	//	FaceDirection.flags = { doLerpTime: true };
	//	FaceDirection.direction = new Vector3(-0.93, 0, -0.35);
	//	FaceDirection.lerpTime = 0.08;
	//	this.sendTo_everyone(FaceDirection, loadingStages.NOT_CONNECTED);
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
		var target = this.getTargetInAcquisitionManual();
		if (!target) {
			target = this.findTargetInAcquisitionRange();
			if (!target) {
				if (!this.emitted_noTargetsInRange) {
					this.emitted_noTargetsInRange = true;
					this.emit('noTargetsInRange');
				}
				return;
			}
		}
		this.emitted_noTargetsInRange = false;

		this.setAttackTarget(target);
		var casted = await this.spellSlots[slotId.A].cast({ target });
		if (casted) {
			//var InstantStop_Attack = Server.network.createPacket('InstantStop_Attack');
			//InstantStop_Attack.netId = this.netId;
			//InstantStop_Attack.flags = {
			//	keepAnimating: true,
			//};
			//this.sendTo_everyone(InstantStop_Attack);

			var UnitSetLookAt = Server.network.createPacket('UnitSetLookAt');
			UnitSetLookAt.netId = this.netId;
			UnitSetLookAt.lookAtType = UnitSetLookAt.constructor.LookAtType.Unit;
			UnitSetLookAt.targetPosition = {
				x: target.position.x,
				y: target.position.y,
				z: 10,
			};
			UnitSetLookAt.targetNetId = target.netId;
			this.sendTo_everyone(UnitSetLookAt);

			this.emit('afterBasicAttack');
		}

		//this.FaceDirection();
		//attackSlot.turretAttackProjectile(basicattack);
	}

	async autoAttackLoop() {
		if (!this.spellSlots[slotId.A])
			return console.log('unit is IAttackable but has no basic attacks', this.name);

		while (!this.died) {
			await this.attackInRange();
			await Promise.wait(100);
		}
	}

	constructor(options) {
		super(options);

		this.on('respawn', () => {
			this.autoAttackLoop();
		});
	}
};
