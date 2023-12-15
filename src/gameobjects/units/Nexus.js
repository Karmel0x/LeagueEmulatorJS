
import packets from '../../packets/index.js';
import loadingStages from '../../constants/loadingStages.js';

import Unit from './Unit.js';
import Defendable from '../extensions/combat/Defendable.js';


class Nexus extends Unit {

	combat;

	/**
	 * @param {import('../GameObjects.js').NexusOptions} options
	 */
	async loader(options) {
		await super.loader(options);

		this.combat = new Defendable(this);

		this.initialized();
	}

	/**
	 * @param {import('../GameObjects.js').NexusOptions} options
	 */
	constructor(options) {
		super(options);
	}

	/**
	 * It sends a packet to everyone says that this building has died
	 * @param {import('../GameObjects.js').AttackableUnit} source - The source of the damage.
	 */
	accounceDie(source) {
		const packet1 = new packets.Building_Die();
		packet1.netId = this.netId;
		packet1.attackerNetId = source.netId;
		this.packets.toEveryone(packet1);
	}

	/**
	 * @param {import('../GameObjects.js').AttackableUnit} source - The source of the damage.
	 */
	async onDie(source) {
		this.accounceDie(source);
		//    //end game?
	}

	spawn() {
		const packet1 = new packets.OnEnterVisibilityClient();
		packet1.netId = this.netId;
		packet1.isTurret = true;
		this.packets.toEveryone(packet1, loadingStages.NOT_CONNECTED);

		super.spawn();
	}

}


export default Nexus;
