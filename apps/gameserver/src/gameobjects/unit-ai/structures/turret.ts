
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import { OnEvent, OnEventArguments } from '@repo/packets/types/on-event';
import loadingStages from '../../../constants/game-state';
import { EventEmitter2 } from '../../../core/event-emitter2';
import type AttackableUnit from '../../units/attackable-unit';
import { AiSubType } from '../base-ai';
import Structure, { StructureEvents, StructureOptions } from './structure';


export type TurretOptions = StructureOptions & {

};

export type TurretEvents = StructureEvents & {

};

export default class Turret extends Structure {
	static initialize(options: TurretOptions) {
		return super.initialize(options) as Turret;
	}

	readonly eventEmitter = new EventEmitter2<TurretEvents>();

	declare options: TurretOptions;
	subType = AiSubType.Turret;

	constructor(options: TurretOptions) {
		super(options);
	}

	loader(options: TurretOptions) {
		super.loader(options);
		this.pinEvents();
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));
		owner.eventEmitter.on('spawn', () => this.onSpawn());
	}

	/**
	 * It sends a packet to everyone that the turret has died
	 */
	announceDie(source: AttackableUnit, assists: AttackableUnit[]) {
		const packet1 = packets.OnEvent.create({
			netId: this.owner.netId,
			eventData: {
				eventId: OnEvent.onTurretDie,
				onEventParam: OnEventArguments[OnEvent.onTurretDie],
				sourceNetId: source.netId,
				otherNetId: source.netId,
				goldGiven: 0,
				assists: assists.map(a => a.netId),
			},
		});
		this.owner.packets.toEveryone(packet1);
	}

	async onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.announceDie(source, assists);
	}

	onSpawnPackets(to: (packet: PacketMessage | undefined) => void) {
		const owner = this.owner;
		if (owner.combat.died)
			return;

		const packet1 = packets.CreateTurret.create({
			netId: owner.netId,
			objectNetId: owner.netId,
			netNodeId: 0x40,
			name: owner.name,
			isTargetable: true,
			isTargetableToTeam: 0x01800000,
		});
		to(packet1);

		if (owner.stats.health.current < owner.stats.health.total)
			owner.packets.OnEnterLocalVisibilityClient(to);

		//const packet2 = packets.OnEnterVisibilityClient.create({
		//	netId: owner.netId,
		//	isTurret: true,
		//});
		//to(packet2);
	}

	onSpawn() {
		const owner = this.owner;
		this.onSpawnPackets((packet) => owner.packets.toEveryone(packet, loadingStages.inGame));
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
