
import * as packets from '@repo/packets/list';
import loadingStages from '../../../constants/loading-stages';
import Structure, { StructureEvents, StructureOptions } from './structure';
import { OnEvent, OnEventArguments } from '@repo/packets/types/on-event';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type AttackableUnit from '../attackable-unit';


export type InhibitorOptions = StructureOptions & {
	team: number;
	num: number;
};

export type InhibitorEvents = StructureEvents & {

};

export default class Inhibitor extends Structure {
	static initialize(options: InhibitorOptions) {
		return super.initialize(options) as Inhibitor;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<InhibitorEvents>;


	loader(options: InhibitorOptions) {
		super.loader(options);

		this.initialized();
	}

	constructor(options: InhibitorOptions) {
		super(options);
	}

	announceDie(source: AttackableUnit) {
		const packet1 = packets.OnEvent.create({
			netId: this.netId,
			eventData: {
				event: OnEvent.onDampenerDie,
				onEventParam: OnEventArguments[OnEvent.onDampenerDie],
				otherNetId: source.netId,
				goldGiven: 0,
				assists: [],
			},
		});
		this.packets.toEveryone(packet1);

		const packet2 = packets.Building_Die.create({
			netId: this.netId,
			killerNetId: source.netId,
		});
		this.packets.toEveryone(packet2);
	}

	async onDie(source: AttackableUnit) {
		this.announceDie(source);
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
