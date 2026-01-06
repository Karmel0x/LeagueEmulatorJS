
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import type Character from '@repo/scripting/base/character';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import { TeamId } from '../../gameobjectextensions/traits/team';
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

	//setCooldown({slot, cooldown}){
	//	const packet1 = packets.SetCooldown.create({
	//		netId: this.netId,
	//		slot: slot,
	//		playVOWhenCooldownReady: false,
	//		isSummonerSpell: false,
	//		cooldown: cooldown,
	//		maxCooldownForDisplay: cooldown || -1,
	//	});
	//	this.packets.toEveryone(packet1);
	//}

	/**
	 * @todo send this packet on first visibility ?
	 */
	onSpawnPackets(to: (packet: PacketMessage | undefined) => void = (packet) => Server.teams[TeamId.all]?.sendPacket(packet)) {
		const owner = this.owner;
		if (!owner.character)
			return;

		const spawner = owner.spawner as JungleCamp | undefined;

		const groupPosition = spawner?.position || owner.position;
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
			groupNumber: spawner?.num,
			//buffSideTeamId: 0,
			//revealEvent: 0,
			//initialLevel: 1,
			//spawnDuration: 0,
			//spawnTime: 0,
			behaviorTree: 0,//false,
			//aiScript: '',
		});
		to(packet1);
		//console.log('CreateNeutral', packet1);
	}

	// on die / death functions ===========================================================

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
