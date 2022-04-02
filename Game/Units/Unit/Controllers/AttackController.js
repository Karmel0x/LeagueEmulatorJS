const { Vector2 } = require("three");

const {createPacket, sendPacket, sendPacketS} = require("../../../../Core/PacketUtilities");
var Targetedshot = require('../../../Attacks/Missiles/Targetedshot');

module.exports = class AttackController {
	constructor(parent){
		this.parent = parent;
	}
	
	attack(target, MovementData = []){
		if(!this.parent.isAbleForMoving())
			return;

		//console.debug(this.Position.distanceTo(target.Position), this.stats.Range.Total);
		if(this.parent.Position.distanceTo(target.Position) > this.parent.stats.Range.Total){
			this.parent.callbacks.move.pending = {
				options: {
					range: this.parent.stats.Range.Total,
				},
				function: () => {
					delete this.parent.callbacks.move.pending;
					this.attack(target, MovementData);
				}
			};
			this.parent.Movement.move1(target.Position);
			//this.Movement.move0(MovementData);
			return;
		}
		this.attackProcess(target);
	}
	beginAttackAns(options){
		var BEGIN_AUTO_ATTACK = createPacket('BEGIN_AUTO_ATTACK', 'S2C');
		BEGIN_AUTO_ATTACK.netId = this.parent.netId;

		let TargetPosition = {
			x: options.target.Position.x,
			y: options.target.Position.y,
			z: 10,
		};

		BEGIN_AUTO_ATTACK.Attack = {
			TargetNetID: options.target.netId,
			TargetPosition: TargetPosition,
			AttackSlot: options.AttackSlot,
			MissileNextID: options.missile.netId,
			ExtraTime: 127,
		};
		BEGIN_AUTO_ATTACK.Position = {
			x: this.parent.Position.x,
			y: this.parent.Position.y,
		};
		
		this.parent.packetController.sendTo_vision(BEGIN_AUTO_ATTACK);
	}
	nextAttackAns(options){
		var NEXT_AUTO_ATTACK = createPacket('NEXT_AUTO_ATTACK', 'S2C');
		NEXT_AUTO_ATTACK.netId = this.parent.netId;

		let TargetPosition = {
			x: options.target.Position.x,
			y: options.target.Position.y,
			z: 10,
		};

		NEXT_AUTO_ATTACK.Attack = {
			TargetNetID: options.target.netId,
			TargetPosition: TargetPosition,
			AttackSlot: options.AttackSlot,
			MissileNextID: options.missile.netId,
			ExtraTime: 127,
		};
		
		this.parent.packetController.sendTo_vision(NEXT_AUTO_ATTACK);
	}
	attackAnsCurrentUnit = 0;
	attackAns(options){
		if(this.attackAnsCurrentUnit != options.target.netId){
			this.attackAnsCurrentUnit = options.target.netId;
			this.beginAttackAns(options);
		}
		else
			this.nextAttackAns(options);
	}
	// attacking
	attackProcess(target){
		if(!this.parent.isAbleForAttacking())
			return;

		var missile = new Targetedshot(this.parent, {speed: 2000});
		this.attackAns({
			target,
			missile,
			AttackSlot: 1,
		});
		missile.fire(target, this.parent.character.attackWindupPercent);
		if(this.parent.Movement.moveClear)
			this.parent.Movement.moveClear();
	}

};
