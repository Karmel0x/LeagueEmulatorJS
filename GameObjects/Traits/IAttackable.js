
const slotId = require("../../Constants/slotId");
const IStatOwner = require("./IStatOwner");
const ISpellable = require("./ISpellable");

/**
 * Trait for units that can attack
 * @class
 * @param {GameObject.<IStatOwner, ISpellable>} I
 */
module.exports = (I) => class IAttackable extends I {


	/**
	 * 
	 * @param {Unit|Number} target|targetNetId 
	 */
	attack(target){
		if(!target.netId)
			target = global.unitsNetId[target];

		if(!target)
			return console.log('unit does not exist', target.netId, target);

		if(!target.damage)
			return console.log('unit cannot be damaged', target.netId, target.constructor.name);

		//if(this.team === target.team)
		//	return;

		console.log('BattleUnit.attack', this.netId, target.netId);
		var dmg = {
			ad: 0,
			ap: 0,
		};
		dmg.ad += this.attackDamage.total;
		target.damage(this, dmg);
	}

	attackTarget = null;
	autoAttackToggle = true;
	autoAttackSoftToggle = true;

	_acquisitionManual = null;
	get acquisitionManual(){
		return this._acquisitionManual;
	}
	set acquisitionManual(target){
		if(target && typeof target != 'object')
			target = global.getUnitByNetId(target);

		this._acquisitionManual = target;
	}

	/**
	 * Get current target if in attackRange
	 * @returns {?Unit}
	 */
	getCurrentAttackTargetIfInAcquisitionRange(){
		if(!this.attackTarget || !this.attackTarget.canBeAttacked())
			return null;

		if(!this.Filters('EDGE_TO_EDGE').isInRange(this.attackTarget, this.attackRange.total || 400))
			return null;
		
		return this.attackTarget;
	}

	attackTargetUnitTypesOrder = ['Minion', 'Player', 'Turret', 'Inhibitor', 'Nexus'];
	/**
	 * Find new target in range, sort by type and distance
	 * @returns {Unit}
	 */
	getNewAttackTarget(){
		var unitsInRange = this.Filters('EDGE_TO_EDGE').filterByRange(this.getEnemyUnits(), this.attackRange.total || 400);
		if(!unitsInRange.length)
			return null;

		this.Filters().sortByDistance(unitsInRange);
		unitsInRange = this.Filters().filterByType(unitsInRange, this.attackTargetUnitTypesOrder);
		this.Filters().sortByType(unitsInRange, this.attackTargetUnitTypesOrder);
		return unitsInRange[0];
	}

	shouldAutoAttackNow(){
		if(!this.autoAttackToggle)
			return false;
		if(!this.autoAttackSoftToggle)
			return false;
		if(this.callbacks.move?.dash)//@todo
			return false;
		return true;
	}

	/**
	 * Find target to attack or get previous target if still in range
	 * @returns {?Unit}
	 */
	findTargetInAcquisitionRange(){
		if(!this.shouldAutoAttackNow())
			return null;

		var target = this.getCurrentAttackTargetIfInAcquisitionRange();
		if(target)
			return target;

		target = this.getNewAttackTarget();
		if(target)
			return target;

		return null;
	}

	/**
	 * Set attackTarget to attack
	 * @param {Unit} target
	 */
	setAttackTarget(target){
		if(this.attackTarget === target)
			return;

		this.attackTarget = target;
	}

	//FaceDirection(){
	//	var FaceDirection = global.Network.createPacket('FaceDirection');
	//	FaceDirection.netId = this.netId;
	//	FaceDirection.flags = { doLerpTime: true };
	//	FaceDirection.direction = new Vector3(-0.93, 0, -0.35);
	//	FaceDirection.lerpTime = 0.08;
	//	this.sendTo_everyone(FaceDirection, loadingStages.NOT_CONNECTED);
	//}
	//UnitApplyDamage(target, damage){
	//	var UnitApplyDamage = global.Network.createPacket('UnitApplyDamage');
	//	UnitApplyDamage.netId = this.netId;
	//	UnitApplyDamage.damageResultType = 4;
	//	UnitApplyDamage.dummy = 0;
	//	UnitApplyDamage.damageType = 0;
	//	UnitApplyDamage.damage = damage;
	//	UnitApplyDamage.targetNetId = target.netId;
	//	UnitApplyDamage.sourceNetId = this.netId;
	//	this.sendTo_everyone(UnitApplyDamage, loadingStages.NOT_CONNECTED);
	//}

	canFollowTarget(target){
		// todo: checks if target is visible, didn't died, ...
		return true;
	}
	getTargetInAcquisitionManual(){
		if(!this.acquisitionManual)
			return null;

		return this.acquisitionManual;
	}

	emitted_noTargetsInRange = false;
	/**
	 * Scan for enemy units in range and attack nearest one
	 */
	attackInRange(){
		var target = this.getTargetInAcquisitionManual();
		if(!target){
			target = this.findTargetInAcquisitionRange();
			if(!target){
				if(!this.emitted_noTargetsInRange){
					this.emitted_noTargetsInRange = true;
					this.emit('noTargetsInRange');
				}
				return;
			}
		}
		this.emitted_noTargetsInRange = false;

		this.setAttackTarget(target);
		this.spellSlots[slotId.A].cast({target});
		//this.FaceDirection();
		//this.UnitApplyDamage(target, 100);
		//attackSlot.turretAttackProjectile(basicattack);
	}
	
	async autoAttackLoop(){
		if(!this.spellSlots[slotId.A])
			return console.log('unit is IAttackable but has no basic attacks', this.name);

		var autoAttackLoopInterval = setInterval(() => {
			if(this.died)
				return;

			this.attackInRange();
		}, 100);

		this.once('die', () => {
			clearInterval(autoAttackLoopInterval);
		});
	}

	constructor(options){
		super(options);

		this.on('respawn', () => {
			this.autoAttackLoop();
		});
	}
};
