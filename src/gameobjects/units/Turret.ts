
import packets from '../../packets/index';
import loadingStages from '../../constants/loadingStages';
import EVENT from '../../packets/EVENT';

import Unit from './Unit';
import Attackable from '../extensions/combat/Attackable';
import { AttackableUnit, TurretOptions } from '../GameObjects';


export default class Turret extends Unit {
	static initialize(options: TurretOptions) {
		return super.initialize(options) as Turret;
	}

	combat;

	loader(options: TurretOptions) {
		super.loader(options);

		this.combat = new Attackable(this);

		this.initialized();
	}

	constructor(options: TurretOptions) {
		super(options);
	}

	/**
	 * It sends a packet to everyone that the turret has died
	 */
	announceDie(source: AttackableUnit) {
		const packet1 = new packets.OnEvent();
		packet1.netId = this.netId;
		packet1.eventId = EVENT.OnTurretDie;
		packet1.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(packet1);
	}

	async onDie(source: AttackableUnit) {
		this.announceDie(source);
	}

	spawn() {
		const packet1 = new packets.CreateTurret();
		packet1.netId = this.netId;
		packet1.netObjId = this.netId;
		packet1.netNodeId = 0x40;
		packet1.objectName = this.info.name;
		packet1.bitfield = {
			isTargetable: true,
		};
		packet1.isTargetableToTeamSpellFlags = 0x01800000;
		this.packets.toEveryone(packet1, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

	///**
	// * Set target for turret to attack
	// * @//param {import('../GameObjects.js').DefendableUnit} target
	// */
	//setTarget(target) {
	//	if (this.target === target)
	//		return;
	//
	//	this.target = target;
	//
	//	const packet1 = new packets.AI_Target();
	//	packet1.netId = this.netId;
	//	packet1.targetNetId = target.netId;
	//	this.packets.toEveryone(packet1);
	//}
}
