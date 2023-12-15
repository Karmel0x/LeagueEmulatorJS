
import packets from '../../packets/index.js';
import loadingStages from '../../constants/loadingStages.js';
import EVENT from '../../packets/EVENT.js';

import Unit from './Unit.js';
import Defendable from '../extensions/combat/Defendable.js';


class Inhibitor extends Unit {

	combat;

	/**
	 * @param {import('../GameObjects.js').InhibitorOptions} options
	 */
	async loader(options) {
		await super.loader(options);

		this.combat = new Defendable(this);

		this.initialized();
	}

	/**
	 * @param {import('../GameObjects.js').InhibitorOptions} options
	 */
	constructor(options) {
		super(options);
	}

	/**
	 * It sends a packet to everyone that the inhibitor has died
	 * @param {import('../GameObjects.js').AttackableUnit} source - The source of the damage.
	 */
	announceDie(source) {
		const packet1 = new packets.OnEvent();
		packet1.netId = this.netId;
		packet1.eventId = EVENT.OnDampenerDie;
		packet1.eventData = {
			otherNetId: source.netId
		};
		this.packets.toEveryone(packet1);

		const packet2 = new packets.Building_Die();
		packet2.netId = this.netId;
		packet2.attackerNetId = source.netId;
		this.packets.toEveryone(packet2);
	}

	/**
	 * @param {import('../GameObjects.js').AttackableUnit} source - The source of the damage.
	 */
	async onDie(source) {
		this.announceDie(source);
	}

	spawn() {
		const packet1 = new packets.OnEnterVisibilityClient();
		packet1.netId = this.netId;
		packet1.isTurret = true;
		this.packets.toEveryone(packet1, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

}


export default Inhibitor;
