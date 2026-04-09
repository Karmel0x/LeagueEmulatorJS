
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import type Character from '@repo/scripting/base/character';
import { EventEmitter2 } from '../../core/event-emitter2';
import type JungleCamp from '../spawners/jungle-camp';
import Minion, { type MinionAttackableUnitOptions, type MinionEvents, type MinionOptions } from './minion';
import { AiSubType, AiType } from './types';


export type NeutralMinionAttackableUnitOptions = MinionAttackableUnitOptions & {
	spawner: JungleCamp;
};

export type NeutralMinionOptions = MinionOptions & {

};

export type NeutralMinionEvents = MinionEvents & {

}

export default class NeutralMinion extends Minion {
	static initialize(options: NeutralMinionOptions) {
		return super.initialize(options) as NeutralMinion;
	}

	static initializeUnit(unitOptions: NeutralMinionAttackableUnitOptions, aiOptions: Omit<NeutralMinionOptions, 'owner'> = {}) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<NeutralMinionEvents>();

	declare options: NeutralMinionOptions;
	type = AiType.Minion;
	subType = AiSubType.NeutralMinion;

	constructor(options: NeutralMinionOptions) {
		super(options);
	}

	loader(options: NeutralMinionOptions) {
		super.loader(options);
	}

	pinEvents() {
		super.pinEvents();
	}

	/**
	 * @todo send this packet on first visibility ?
	 */
	onSpawnPackets() {
		const spawnPackets: (PacketMessage | undefined)[] = [];
		const owner = this.owner;
		if (!owner.character)
			return spawnPackets;

		const spawner = owner.spawner as JungleCamp;

		const groupPosition = spawner.position;
		const packet1 = packets.CreateNeutral.create({
			netId: owner.netId,
			objectNetId: owner.netId,
			netNodeId: 0x40,
			position: {
				x: owner.position.x,
				y: owner.position.y,
				z: owner.height,
			},
			groupPosition: {
				x: groupPosition.x,
				y: groupPosition.y,
				z: owner.height,
			},
			faceDirectionPosition: {
				x: owner.facePosition.x,
				y: owner.facePosition.y,
				z: owner.height,
			},
			name: owner.name,
			skinName: owner.skin,
			uniqueName: owner.name,
			//spawnAnimationName: '',
			team: owner.team.id,
			damageBonus: 0,
			healthBonus: 0,
			roamState: 0,
			groupNumber: spawner.num,
			//buffSideTeamId: 0,
			//revealEvent: 0,
			//initialLevel: 1,
			//spawnDuration: 0,
			//spawnTime: 0,
			behaviorTree: false,
			//aiScript: '',
		});
		//console.log('CreateNeutral', packet1);
		spawnPackets.push(packet1);

		return spawnPackets;
	}

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get characterBase() {
		const character = this.owner.character;
		return character?.constructor as typeof Character | undefined;
	}

	get expRadius() {
		const range = 800;
		return range;
	}

}
