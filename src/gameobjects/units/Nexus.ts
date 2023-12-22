
import packets from '../../packets/index';
import loadingStages from '../../constants/loadingStages';

import Unit from './Unit';
import Defendable from '../extensions/combat/Defendable';
import { AttackableUnit, NexusOptions } from '../GameObjects';


export default class Nexus extends Unit {
	static initialize(options: NexusOptions) {
		return super.initialize(options) as Nexus;
	}

	combat!: Defendable;

	loader(options: NexusOptions) {
		super.loader(options);

		this.combat = new Defendable(this);

		this.initialized();
	}

	constructor(options: NexusOptions) {
		super(options);
	}

	/**
	 * It sends a packet to everyone says that this building has died
	 */
	accounceDie(source: AttackableUnit) {
		const packet1 = new packets.Building_Die();
		packet1.netId = this.netId;
		packet1.attackerNetId = source.netId;
		this.packets.toEveryone(packet1);
	}

	/**
	 * source - The source of the damage.
	 */
	async onDie(source: AttackableUnit) {
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
