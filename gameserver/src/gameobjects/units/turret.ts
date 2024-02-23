
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../constants/loading-stages';
//import EVENT from '../../packets/EVENT';

import Unit, { UnitEvents, UnitOptions } from './unit';
import Attackable, { AttackableEvents, IAttackable } from '../extensions/combat/attackable';
import { OnEvent, OnEventArguments } from '@workspace/packets/packages/packets/types/on-event';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';


export type TurretOptions = UnitOptions & {

};

export type TurretEvents = UnitEvents & AttackableEvents & {

}

export default class Turret extends Unit {
	static initialize(options: TurretOptions) {
		return super.initialize(options) as Turret;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<TurretEvents>;

	combat!: Attackable;

	loader(options: TurretOptions) {
		super.loader(options);

		this.combat = new Attackable(this);

		this.initialized();
	}

	constructor(options: TurretOptions) {
		super(options);
	}

	/**
	 * It sends a packet to everyone that the turret has died
	 */
	announceDie(source: IAttackable) {
		const packet1 = packets.OnEvent.create({
			netId: this.netId,
			eventData: {
				event: OnEvent.onTurretDie,
				onEventParam: OnEventArguments[OnEvent.onTurretDie],
				otherNetId: source.netId,
				goldGiven: 0,
				assists: [],
			},
		});
		this.packets.toEveryone(packet1);
	}

	async onDie(source: IAttackable) {
		this.announceDie(source);
	}

	spawn() {
		const packet1 = packets.CreateTurret.create({
			netId: this.netId,
			objectNetId: this.netId,
			netNodeId: 0x40,
			name: this.info.name,
			isTargetable: true,
			unknown1: false,
			unknown2: false,
			isTargetableToTeam: 0x01800000,
		});
		this.packets.toEveryone(packet1, loadingStages.notConnected);

		super.spawn();
	}

	///**
	// * Set target for turret to attack
	// */
	//setTarget(target) {
	//	if (this.target === target)
	//		return;
	//
	//	this.target = target;
	//
	//	const packet1 = packets.AI_Target.create({
	//		netId: this.netId,
	//		targetNetId: target.netId,
	//	});
	//	this.packets.toEveryone(packet1);
	//}
}
