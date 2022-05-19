
const { createPacket } = require("../../../Core/PacketUtilities");
const Targetedshot = require("../../Attacks/Missiles/Targetedshot");
const _Spell = require("./_Spell");
const _Spellchain = require("./_Spellchain");


module.exports = class _Basicattackchain extends _Spellchain {
	attack(target, MovementData = []){
		//console.debug(this.Position.distanceTo(target.Position), this.stats.Range.Total);
		if(this.owner.Position.distanceTo(target.Position) > this.owner.stats.Range.Total){
			if(this.owner.isAbleForMoving()){
				this.owner.callbacks.move.pending = {
					options: {
						range: this.owner.stats.Range.Total,
					},
					function: () => {
						delete this.owner.callbacks.move.pending;
						this.attack(target, MovementData);
					}
				};
				this.owner.Movement.move1(target.Position);
			}
			return;
		}
		this.attackProcess(target);
	}
	// attacking
	attackProcess(target){
		if(!this.owner.isAbleForAttacking())
			return;

		var bassicattack = this.process(this.owner, target, {speed: 2000});

		if(this.owner.Movement?.moveClear)
			this.owner.Movement.moveClear();

		return bassicattack;
	}


	beginAttackAns(options){
		var BEGIN_AUTO_ATTACK = createPacket('BEGIN_AUTO_ATTACK', 'S2C');
		BEGIN_AUTO_ATTACK.netId = this.owner.netId;

		let TargetPosition = {
			x: options.missile.target.Position.x,
			y: options.missile.target.Position.y,
			z: 10,
		};

		BEGIN_AUTO_ATTACK.Attack = {
			TargetNetId: options.missile.target.netId,
			TargetPosition: TargetPosition,
			AttackSlot: options.AttackSlot,
			MissileNextID: options.missile.netId,
			ExtraTime: 127,
		};
		BEGIN_AUTO_ATTACK.Position = {
			x: this.owner.Position.x,
			y: this.owner.Position.y,
		};
		
		this.owner.packetController.sendTo_vision(BEGIN_AUTO_ATTACK);
	}
	nextAttackAns(options){
		var NEXT_AUTO_ATTACK = createPacket('NEXT_AUTO_ATTACK', 'S2C');
		NEXT_AUTO_ATTACK.netId = this.owner.netId;

		let TargetPosition = {
			x: options.missile.target.Position.x,
			y: options.missile.target.Position.y,
			z: 10,
		};

		NEXT_AUTO_ATTACK.Attack = {
			TargetNetId: options.missile.target.netId,
			TargetPosition: TargetPosition,
			AttackSlot: options.AttackSlot,
			MissileNextID: options.missile.netId,
			ExtraTime: 127,
		};
		
		this.owner.packetController.sendTo_vision(NEXT_AUTO_ATTACK);
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
	 * @param {Unit} source
	 * @param {Unit} target
	 * @param {Object} options
	 * @returns {Targetedshot}
	 */
	process(source, target, options = {}){
		var targetedshot = Targetedshot.create(source, target, options);
		this.attackAns({
			missile: targetedshot,
			AttackSlot: options.AttackSlot ?? 1,
		});
		targetedshot.doFire();
		return targetedshot;
	}
	//static async cast(spellChain){
	//	//var missile = this.process(this.owner, target, {speed: 2000});
////
	//	//var spellInternal_1 = new this(spellChain, missile);
	//	//await global.Utilities.wait(spellInternal_1.windup * 1000);
	//	//spellInternal_1.shot();
	//	//return spellInternal_1;
	//}

	windupPercent = 20;

	shot(){
		
	}

	castAttack(target){
		this.cast({
			Position: this.owner.Position,
			TargetPosition: target.Position,
			EndPosition: this.owner.Position,
			target: target,
		});
	}
};
