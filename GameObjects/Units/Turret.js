var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../Core/PacketUtilities");
const loadingStages = require("../../Constants/loadingStages");
const { Vector2 } = require('three');
const slotId = require('../../Constants/slotId');

const Turrets = {
	BLUE: {
		0: {position: {x: 10097.618, y:   808.733}, info: {name: 'Turret_T1_R_03_A'}, character: 'ChaosTurretWorm'},
		1: {position: {x:  6512.527, y:  1262.615}, info: {name: 'Turret_T1_R_02_A'}, character: 'ChaosTurretWorm'},
		2: {position: {x:  3747.255, y:  1041.044}, info: {name: 'Turret_T1_C_07_A'}, character: 'ChaosTurretWorm'},

		3: {position: {x:  5448.357, y:  6169.100}, info: {name: 'Turret_T1_C_05_A'}, character: 'ChaosTurretWorm'},
		4: {position: {x:  4656.998, y:  4591.909}, info: {name: 'Turret_T1_C_04_A'}, character: 'ChaosTurretWorm'},
		5: {position: {x:  3233.994, y:  3447.242}, info: {name: 'Turret_T1_C_03_A'}, character: 'ChaosTurretWorm'},
		6: {position: {x:  1341.633, y:  2029.984}, info: {name: 'Turret_T1_C_01_A'}, character: 'ChaosTurretWorm'},
		7: {position: {x:  1768.192, y:  1589.465}, info: {name: 'Turret_T1_C_02_A'}, character: 'ChaosTurretWorm'},

		8: {position: {x:  -236.047, y:   -53.322}, info: {name: 'Turret_OrderTurretShrine_A'}, character: 'ChaosTurretWorm'},
			
		9: {position: {x:   574.655, y: 10220.471}, info: {name: 'Turret_T1_L_03_A'}, character: 'ChaosTurretWorm'},
		10:{position: {x:  1106.263, y:  6465.252}, info: {name: 'Turret_T1_L_02_A'}, character: 'ChaosTurretWorm'},
		11:{position: {x:   802.810, y:  4052.360}, info: {name: 'Turret_T1_C_06_A'}, character: 'ChaosTurretWorm'},
	},
	RED: {
		0: {position: {x: 13459.614, y:  4284.239}, info: {name: 'Turret_T2_R_03_A'}, character: 'ChaosTurretWorm'},
		1: {position: {x: 12920.789, y:  8005.292}, info: {name: 'Turret_T2_R_02_A'}, character: 'ChaosTurretWorm'},
		2: {position: {x: 13205.825, y: 10474.619}, info: {name: 'Turret_T2_R_01_A'}, character: 'ChaosTurretWorm'},

		3: {position: {x:  8548.805, y:  8289.496}, info: {name: 'Turret_T2_C_05_A'}, character: 'ChaosTurretWorm'},
		4: {position: {x:  9361.072, y:  9892.624}, info: {name: 'Turret_T2_C_04_A'}, character: 'ChaosTurretWorm'},
		5: {position: {x: 10743.581, y: 11010.062}, info: {name: 'Turret_T2_C_03_A'}, character: 'ChaosTurretWorm'},
		6: {position: {x: 12662.488, y: 12442.701}, info: {name: 'Turret_T2_C_01_A'}, character: 'ChaosTurretWorm'},
		7: {position: {x: 12118.147, y: 12876.629}, info: {name: 'Turret_T2_C_02_A'}, character: 'ChaosTurretWorm'},

		8: {position: {x: 14157.025, y: 14456.353}, info: {name: 'Turret_ChaosTurretShrine_A'}, character: 'ChaosTurretWorm'},

		9: {position: {x:  3911.675, y: 13654.815}, info: {name: 'Turret_T2_L_03_A'}, character: 'ChaosTurretWorm'},
		10:{position: {x:  7536.523, y: 13190.815}, info: {name: 'Turret_T2_L_02_A'}, character: 'ChaosTurretWorm'},
		11:{position: {x: 10261.900, y: 13465.911}, info: {name: 'Turret_T2_L_01_A'}, character: 'ChaosTurretWorm'},
	}
};

const EVENT = require('../../Packets/EVENT');
const BaseInterface = require('../../Core/BaseInterface');
const IDefendable = require('../Interfaces/IDefendable');
const IAttackable = require('../Interfaces/IAttackable');


class Turret extends BaseInterface(Unit, IDefendable, IAttackable) {

	/**
	 * It sends a packet to everyone that the turret has died
	 * @param source - The source of the damage.
	 */
	announceDie(source){
		var ANNOUNCE2 = createPacket('ANNOUNCE2');
		ANNOUNCE2.netId = this.netId;
		ANNOUNCE2.id = EVENT.OnTurretDie;
		ANNOUNCE2.EventData = {
			OtherNetId: source.netId
		};
		this.sendTo_everyone(ANNOUNCE2);
	}
	async onDie(source){
		this.announceDie(source);
	}

	constructor(...args){
		super(...args);
		
		this.initialized();
	}
	spawn(){
		var TURRET_SPAWN = createPacket('TURRET_SPAWN', 'S2C');
		TURRET_SPAWN.netId = this.netId;
		TURRET_SPAWN.NetId = this.netId;
		TURRET_SPAWN.NetNodeID = 0x40;
		TURRET_SPAWN.Name = this.info.name;
		TURRET_SPAWN.bitfield = {
			isTargetable: true,
		};
		TURRET_SPAWN.IsTargetableToTeamSpellFlags = 0x01800000;
		this.sendTo_everyone(TURRET_SPAWN, loadingStages.NOT_CONNECTED);

		super.spawn();
	}
	/**
	 * 
	 * @param {Object} spawnList {TEAM: [{character, position}]}
	 */
	static spawnAll(spawnList = Turrets){
		for(let team in spawnList)
			for(let num in spawnList[team])
				new Turret({
					team, num,
					character: spawnList[team][num].character,
					spawnPosition: spawnList[team][num].position,
					info: spawnList[team][num].info
				});
	}

	acquisitionRange = 750;

	/**
	 * Get current target if in range
	 * @returns {?Unit}
	 */
	getCurrentTargetIfInRange(){
		return this.target && this.inRange(this.target, this.attackRange.total) ? this.target : null;
	}
	/**
	 * Find new target in range, sort by type and distance
	 * @returns {Unit}
	 */
	getNewTarget(){
		var unitsInRange = this.getEnemyUnitsInRange(this.attackRange.total);
		if(!unitsInRange.length)
			return null;

		Unit.sortUnitsByDistance(unitsInRange, this.position);
		var targetUnitTypesOrder = ['Minion', 'Player'];
		unitsInRange = Unit.filterUnitsByType(unitsInRange, targetUnitTypesOrder);
		Unit.sortUnitsByType(unitsInRange, targetUnitTypesOrder);
		return unitsInRange[0];
	}
	/**
	 * Find target to attack or get previous target if still in range
	 * @returns {?Unit}
	 */
	findTarget(){
		var target = this.getCurrentTargetIfInRange();
		if(target)
			return target;

		target = this.getNewTarget();
		if(target)
			return target;

		return null;
	}
	/**
	 * Set target for turret to attack
	 * @param {Unit} target
	 */
	setTarget(target){
		if(this.target === target)
			return;

		this.target = target;
		var SET_TARGET = createPacket('SET_TARGET', 'S2C');
		SET_TARGET.netId = this.netId;
		SET_TARGET.targetNetId = target.netId;
		this.sendTo_everyone(SET_TARGET);
	}
	//FACE_DIRECTION(){
	//	var FACE_DIRECTION = createPacket('FACE_DIRECTION');
	//	FACE_DIRECTION.netId = this.netId;
	//	FACE_DIRECTION.flags_DoLerpTime = 1;
	//	FACE_DIRECTION.Direction = new Vector3b(-0.93, 0, -0.35);
	//	FACE_DIRECTION.LerpTime = 0.08;
	//	this.sendTo_everyone(FACE_DIRECTION, loadingStages.NOT_CONNECTED);
	//}
	//DAMAGE_DONE(target, damage){
	//	var DAMAGE_DONE = createPacket('DAMAGE_DONE');
	//	DAMAGE_DONE.netId = this.netId;
	//	DAMAGE_DONE.DamageResultType = 4;
	//	DAMAGE_DONE.dummy = 0;
	//	DAMAGE_DONE.DamageType = 0;
	//	DAMAGE_DONE.Damage = damage;
	//	DAMAGE_DONE.TargetNetId = target.netId;
	//	DAMAGE_DONE.SourceNetId = this.netId;
	//	this.sendTo_everyone(DAMAGE_DONE, loadingStages.NOT_CONNECTED);
	//}
	/**
	 * Scan for enemy units in range and attack nearest one
	 */
	attackInRange(){
		var target = this.findTarget();
		if(!target)
			return;

		this.setTarget(target);
		this.spellSlots[slotId.A].cast({target});
		//this.FACE_DIRECTION();
		//this.DAMAGE_DONE(target, 100);
		//attackSlot.turretAttackProjectile(basicattack);
	}

	
	async loop(){
		while(true){
			await global.Utilities.wait(1000);

			//if(!global.Game.loaded)
			//	continue;

			if(this.died)
				break;

			this.attackInRange();
		}

	}
}


module.exports = Turret;
