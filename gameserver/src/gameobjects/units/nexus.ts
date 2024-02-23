
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../constants/loading-stages';

import Unit, { UnitEvents, UnitOptions } from './unit';
import Defendable, { DefendableEvents } from '../extensions/combat/defendable';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import { IAttackable } from '../extensions/combat/attackable';


export type NexusOptions = UnitOptions & {
	team: number;
};

export type NexusEvents = UnitEvents & DefendableEvents & {

}

export default class Nexus extends Unit {
	static initialize(options: NexusOptions) {
		return super.initialize(options) as Nexus;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<NexusEvents>;

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
	accounceDie(source: IAttackable) {
		const packet1 = packets.Building_Die.create({
			netId: this.netId,
			attackerNetId: source.netId,
		});
		this.packets.toEveryone(packet1);
	}

	/**
	 * source - The source of the damage.
	 */
	async onDie(source: IAttackable) {
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
