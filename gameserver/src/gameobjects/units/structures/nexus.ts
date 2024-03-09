
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../../constants/loading-stages';
import Structure, { StructureEvents, StructureOptions } from './structure';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type AttackableUnit from '../attackable-unit';


export type NexusOptions = StructureOptions & {
	team: number;
};

export type NexusEvents = StructureEvents & {

}

export default class Nexus extends Structure {
	static initialize(options: NexusOptions) {
		return super.initialize(options) as Nexus;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<NexusEvents>;


	loader(options: NexusOptions) {
		super.loader(options);

		this.initialized();
	}

	constructor(options: NexusOptions) {
		super(options);
	}

	/**
	 * It sends a packet to everyone says that this building has died
	 */
	accounceDie(source: AttackableUnit) {
		const packet1 = packets.Building_Die.create({
			netId: this.netId,
			killerNetId: source.netId,
		});
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
		const packet1 = packets.OnEnterVisibilityClient.create({
			netId: this.netId,
			isTurret: true,
		});
		this.packets.toEveryone(packet1, loadingStages.notConnected);

		super.spawn();
	}

}
