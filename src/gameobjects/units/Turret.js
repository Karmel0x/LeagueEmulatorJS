
import packets from '../../packets/index.js';
import loadingStages from '../../constants/loadingStages.js';
import EVENT from '../../packets/EVENT.js';

import Unit from './Unit.js';
import Attackable from '../extensions/combat/Attackable.js';


class Turret extends Unit {

	combat;

	/**
	 * @param {import('../GameObjects.js').TurretOptions} options 
	 */
	async loader(options) {
		await super.loader(options);

		this.combat = new Attackable(this);

		this.initialized();
	}

	/**
	 * @param {import('../GameObjects.js').TurretOptions} options 
	 */
	constructor(options) {
		super(options);
	}

	/**
	 * It sends a packet to everyone that the turret has died
	 * @param {import('../GameObjects.js').AttackableUnit} source - The source of the damage.
	 */
	announceDie(source) {
		const packet1 = new packets.OnEvent();
		packet1.netId = this.netId;
		packet1.eventId = EVENT.OnTurretDie;
		packet1.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(packet1);
	}

	/**
	 * @param {import('../GameObjects.js').AttackableUnit} source
	 */
	async onDie(source) {
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
	// * @param {import('../GameObjects.js').DefendableUnit} target
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


export default Turret;
