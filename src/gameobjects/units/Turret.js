
const loadingStages = require("../../constants/loadingStages");
const EVENT = require('../../packets/EVENT');
const Server = require('../../app/Server');

const Unit = require('./Unit');
const Attackable = require('../extensions/combat/Attackable');


class Turret extends Unit {

	combat;

	/**
	 * 
	 * @param {import('../GameObjects').TurretOptions} options 
	 */
	constructor(options) {
		super(options);
		this.options = options;

		this.combat = new Attackable(this);

		this.initialized();
	}

	/**
	 * It sends a packet to everyone that the turret has died
	 * @param {import("../GameObjects").AttackableUnit} source - The source of the damage.
	 */
	announceDie(source) {
		const OnEvent = Server.network.createPacket('OnEvent');
		OnEvent.netId = this.netId;
		OnEvent.eventId = EVENT.OnTurretDie;
		OnEvent.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(OnEvent);
	}

	/**
	 * @param {import("../GameObjects").AttackableUnit} source
	 */
	async onDie(source) {
		this.announceDie(source);
	}

	spawn() {
		const CreateTurret = Server.network.createPacket('CreateTurret', 'S2C');
		CreateTurret.netId = this.netId;
		CreateTurret.netObjId = this.netId;
		CreateTurret.netNodeId = 0x40;
		CreateTurret.objectName = this.info.name;
		CreateTurret.bitfield = {
			isTargetable: true,
		};
		CreateTurret.isTargetableToTeamSpellFlags = 0x01800000;
		this.packets.toEveryone(CreateTurret, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

	///**
	// * Set target for turret to attack
	// * @param {import("../GameObjects").DefendableUnit} target
	// */
	//setTarget(target) {
	//	if (this.target === target)
	//		return;
	//
	//	this.target = target;
	//
	//	const AI_Target = Server.network.createPacket('AI_Target', 'S2C');
	//	AI_Target.netId = this.netId;
	//	AI_Target.targetNetId = target.netId;
	//	this.packets.toEveryone(AI_Target);
	//}
}


module.exports = Turret;
