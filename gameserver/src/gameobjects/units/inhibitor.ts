
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../constants/loading-stages';
//import EVENT from '../../packets/EVENT';

import Unit, { UnitEvents, UnitOptions } from './unit';
import Defendable, { DefendableEvents } from '../extensions/combat/defendable';

import { OnEvent, OnEventArguments } from '@workspace/packets/packages/packets/types/on-event';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import { IAttackable } from '../extensions/combat/attackable';


export type InhibitorOptions = UnitOptions & {
	team: number;
	num: number;
};

export type InhibitorEvents = UnitEvents & DefendableEvents & {

}

export default class Inhibitor extends Unit {
	static initialize(options: InhibitorOptions) {
		return super.initialize(options) as Inhibitor;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<InhibitorEvents>;

	combat!: Defendable;

	loader(options: InhibitorOptions) {
		super.loader(options);

		this.combat = new Defendable(this);

		this.initialized();
	}

	constructor(options: InhibitorOptions) {
		super(options);
	}

	announceDie(source: IAttackable) {
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

	async onDie(source: IAttackable) {
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
