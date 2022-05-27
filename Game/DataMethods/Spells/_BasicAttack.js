
const slotId = require('../../../Constants/slotId');
const _Spell = require("./_Spell");
const Targetedshot = require("../../../GameObjects/Missiles/Targetedshot");
const { createPacket } = require("../../../Core/PacketUtilities");


module.exports = class _Basicattack extends _Spell {
	spellSlot = slotId.A;
	windupPercent = 20;
	castRange = 0;
	missileSpeed = 2000;

	constructor(options){
		super(options);

		this.owner.on('changeStats', () => {
			this.castRange = this.owner.attackRange.total;
		})
	}

	// attacking
	attackProcess(target){
		if(!this.owner.isAbleForAttacking())
			return;

		var bassicattack = this.process(this.owner, target, {speed: this.missileSpeed});

		if(this.owner.moveClear)
			this.owner.moveClear();

		return bassicattack;
	}

	beginAttackAns(options){
		var BEGIN_AUTO_ATTACK = createPacket('BEGIN_AUTO_ATTACK', 'S2C');
		BEGIN_AUTO_ATTACK.netId = this.owner.netId;

		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		BEGIN_AUTO_ATTACK.Attack = {
			TargetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			AttackSlot: options.AttackSlot,
			MissileNextID: options.missile.netId,
			ExtraTime: 127,
		};
		BEGIN_AUTO_ATTACK.position = {
			x: this.owner.position.x,
			y: this.owner.position.y,
		};
		
		this.owner.sendTo_vision(BEGIN_AUTO_ATTACK);
	}
	nextAttackAns(options){
		var NEXT_AUTO_ATTACK = createPacket('NEXT_AUTO_ATTACK', 'S2C');
		NEXT_AUTO_ATTACK.netId = this.owner.netId;

		let targetPosition = {
			x: options.missile.target.position.x,
			y: options.missile.target.position.y,
			z: 10,
		};

		NEXT_AUTO_ATTACK.Attack = {
			TargetNetId: options.missile.target.netId,
			targetPosition: targetPosition,
			AttackSlot: options.AttackSlot,
			MissileNextID: options.missile.netId,
			ExtraTime: 127,
		};
		
		this.owner.sendTo_vision(NEXT_AUTO_ATTACK);
	}
	attackAnsCurrentUnit = 0;
	attackAns(options){
		if(this.attackAnsCurrentUnit != options.missile.target.netId){
			this.attackAnsCurrentUnit = options.missile.target.netId;
			this.beginAttackAns(options);
		}
		else
			this.nextAttackAns(options);
	}
	/**
	 * 
	 * @param {Unit} owner
	 * @param {Unit} target
	 * @param {Object} options
	 * @returns {Targetedshot}
	 */
	process(owner, target, options = {}){
		options.windupPercent = options.windupPercent || this.windupPercent;
		var missile = new Targetedshot({owner, target, options});
		this.attackAns({
			missile,
			AttackSlot: options.AttackSlot ?? 1,
		});
		missile.doFire();
		return missile;
	}

	onCast(spellData){
		super.onCast(spellData);

		spellData.missile = this.attackProcess(spellData.target);
	}
	afterCast(spellData){
		this.owner.emit('spellCastingEnd', spellData);
		
		if(this.isProjectile)
			this.spawnProjectileAns(spellData.spellCast.CastInfo);
	}
};
