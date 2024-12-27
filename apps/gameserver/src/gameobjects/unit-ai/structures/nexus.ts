
import * as packets from '@repo/packets/list';
import loadingStages from '../../../constants/game-state';
import { EventEmitter2 } from '../../../core/event-emitter2';
import type AttackableUnit from '../../units/attackable-unit';
import { AiSubType } from '../base-ai';
import Structure, { StructureEvents, StructureOptions } from './structure';


export type NexusOptions = StructureOptions & {

};

export type NexusEvents = StructureEvents & {

}

export default class Nexus extends Structure {
	static initialize(options: NexusOptions) {
		return super.initialize(options) as Nexus;
	}

	readonly eventEmitter = new EventEmitter2<NexusEvents>();

	declare options: NexusOptions;
	subType = AiSubType.Nexus;

	constructor(options: NexusOptions) {
		super(options);
	}

	loader(options: NexusOptions) {
		super.loader(options);
		this.pinEvents();
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));
		owner.eventEmitter.on('spawn', () => this.onSpawn());
	}

	/**
	 * It sends a packet to everyone says that this building has died
	 */
	accounceDie(source: AttackableUnit, assists: AttackableUnit[]) {
		const owner = this.owner;
		const packet1 = packets.Building_Die.create({
			netId: owner.netId,
			killerNetId: source.netId,
		});
		owner.packets.toEveryone(packet1);
	}

	/**
	 * source - The source of the damage.
	 */
	async onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.accounceDie(source, assists);
		//    //end game?
	}

	onSpawn() {
		const owner = this.owner;
		const packet1 = packets.OnEnterVisibilityClient.create({
			netId: owner.netId,
			isTurret: true,
		});
		owner.packets.toEveryone(packet1, loadingStages.notConnected);
	}

}
