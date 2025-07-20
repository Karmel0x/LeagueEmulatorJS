
import * as packets from '@repo/packets/list';
import { OnEvent, OnEventArguments } from '@repo/packets/types/on-event';
import loadingStages from '../../../constants/game-state';
import { EventEmitter2 } from '../../../core/event-emitter2';
import { LaneId } from '../../../gameobjectextensions/traits/team';
import type AttackableUnit from '../../units/attackable-unit';
import type { AttackableUnitOptions } from '../../units/attackable-unit';
import { AiSubType } from '../types';
import Structure, { type StructureEvents, type StructureOptions } from './structure';

export enum DampenerState {
	regeneration = 0x0,
	respawning = 0x1,
};

export type InhibitorOptions = StructureOptions & {
	lane?: number;
	num?: number;
};

export type InhibitorEvents = StructureEvents & {

};

export default class Inhibitor extends Structure {
	static initialize(options: InhibitorOptions) {
		return super.initialize(options) as Inhibitor;
	}

	static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<InhibitorOptions, 'owner'> = {}) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<InhibitorEvents>();

	declare options: InhibitorOptions;
	subType = AiSubType.Inhibitor;
	lane: number;

	constructor(options: InhibitorOptions) {
		super(options);

		this.lane = options.lane ?? LaneId.unknown;
	}

	loader(options: InhibitorOptions) {
		this.owner.combat.respawnable = true;

		super.loader(options);
		this.pinEvents();
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));
		owner.eventEmitter.on('spawn', () => this.onSpawn());
	}

	announceDie(source: AttackableUnit, assists: AttackableUnit[]) {
		const owner = this.owner;
		const packet1 = packets.OnEvent.create({
			netId: owner.netId,
			eventData: {
				eventId: OnEvent.onDampenerDie,
				onEventParam: OnEventArguments[OnEvent.onDampenerDie],
				sourceNetId: source.netId,
				otherNetId: source.netId,
				goldGiven: 0,
				assists: assists.map(a => a.netId),
			},
		});
		owner.packets.toEveryone(packet1);

		const packet2 = packets.Building_Die.create({
			netId: owner.netId,
			killerNetId: source.netId,
		});
		owner.packets.toEveryone(packet2);
	}

	async onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.announceDie(source, assists);
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
