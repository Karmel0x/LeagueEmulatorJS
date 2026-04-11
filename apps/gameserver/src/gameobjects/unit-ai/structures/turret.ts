
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import { OnEvent, OnEventArguments } from '@repo/packets/types/on-event';
import loadingStages from '../../../constants/game-state';
import { EventEmitter2 } from '../../../core/event-emitter2';
import type AttackableUnit from '../../units/attackable-unit';
import { AiSubType } from '../types';
import Structure, { type StructureEvents, type StructureOptions } from './structure';


export type TurretOptions = StructureOptions & {
	lane: number,
	depth: number,
	num: number,
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
		const owner = this.owner;
		const packet1 = packets.OnEvent.create({
			netId: owner.netId,
			eventData: {
				eventId: OnEvent.onTurretDie,
				onEventParam: OnEventArguments[OnEvent.onTurretDie],
				sourceNetId: source.netId,
				otherNetId: source.netId,
				goldGiven: 0,
				assists: assists.map(a => a.netId),
			},
		});
		owner.packets.toEveryone(packet1);
	}

	async onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.announceDie(source, assists);
		super.onDie(source, assists);
	}

	onSpawnPackets() {
		const spawnPackets: (PacketMessage | undefined)[] = [];
		const owner = this.owner;
		if (owner.combat.died)
			return spawnPackets;

		const packet1 = packets.CreateTurret.create({
			netId: owner.netId,
			objectNetId: owner.netId,
			netNodeId: 0x40,
			name: owner.name,
		});
		spawnPackets.push(packet1);

		if (owner.stats.health.current < owner.stats.health.total) {
			const packet2 = owner.packets.OnEnterLocalVisibilityClient();
			spawnPackets.push(packet2);
		}

		//const packet3 = packets.OnEnterVisibilityClient.create({
		//	netId: owner.netId,
		//	isTurret: true,
		//});
		//spawnPackets.push(packet3);

		return spawnPackets;
	}

	onSpawn() {
		const owner = this.owner;
		const packets = this.onSpawnPackets();
		owner.packets.toEveryone(packets, loadingStages.inGame);

		let lastTarget: AttackableUnit | undefined = undefined;

		const interval1 = setInterval(() => {
			if (owner.combat.died) {
				clearInterval(interval1);
				return;
			}

			const target = owner.combat.findNewTargetInAcR();
			if (target) {
				if (lastTarget !== target) {
					lastTarget = target;
					owner.combat.setOrderAndTarget(target);
				}
			}
			else {
				lastTarget = undefined;
				owner.combat.attackTarget = undefined;
			}
		}, 250);

		super.onSpawn();
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
