
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import type Character from '@repo/scripting/base/character';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import { TeamId } from '../extensions/traits/team';
import type JungleCamp from '../spawners/jungle-camp';
import type AttackableUnit from '../units/attackable-unit';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import BaseAi, { type BaseAiEvents, type BaseAiOptions } from './base-ai';
import Player from './player';
import { AiSubType, AiType } from './types';


export type MonsterOptions = BaseAiOptions & {

};

export type MonsterEvents = BaseAiEvents & {

}

export default class Monster extends BaseAi {
	static initialize(options: MonsterOptions) {
		return super.initialize(options) as Monster;
	}

	static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<MonsterOptions, 'owner'> = {}) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<MonsterEvents>();

	declare options: MonsterOptions;
	type = AiType.Minion;
	subType = AiSubType.JungleMonster;

	constructor(options: MonsterOptions) {
		super(options);
	}

	loader(options: MonsterOptions) {
		super.loader(options);
		this.pinEvents();
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));

		owner.eventEmitter.on('noTargetsInRange', () => {
			this.stopAttack();
		});

		owner.eventEmitter.on('spawn', () => {
			this.onSpawnPackets();
		});
	}

	stopAttack() {
		const packet1 = packets.InstantStop_Attack.create({
			netId: this.owner.netId,
		});
		this.owner.packets.toEveryone(packet1);
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
	onSpawnPackets(to: (packet: PacketMessage | undefined) => void = (packet) => Server.teams[TeamId.max]?.sendPacket(packet)) {
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
		return this.owner.character?.constructor as typeof Character | undefined;
	}

	get rewardExp() {
		const character = this.owner.character;
		return 0;
	}

	get rewardGold() {
		const character = this.owner.character;
		return 0;
	}

	onDieRewards(source: AttackableUnit, assists: AttackableUnit[]) {
		const owner = this.owner;
		console.log('onDieRewards', source.team.id, owner.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id === owner.team.id)
			return;

		if (source.ai instanceof Player) {
			source.progress.expUp(this.rewardExp);
			source.progress.goldUp(this.rewardGold, owner);
		}
	}

	onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.onDieRewards(source, assists);
	}

}
