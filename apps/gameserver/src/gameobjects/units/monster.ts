
import * as packets from '@repo/packets/list';
import loadingStages from '../../constants/loading-stages';
import Server from '../../app/server';

import AttackableUnit, { AttackableUnitEvents, AttackableUnitOptions } from './attackable-unit';
import { TeamId } from '../extensions/traits/team';
import _Monster from '../../game/basedata/characters/monster';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type JungleCamp from '../spawners/jungle-camp';
import Player from './player';


export type MonsterOptions = AttackableUnitOptions & {
	spawner: JungleCamp;
};

export type MonsterEvents = AttackableUnitEvents & {

}

export default class Monster extends AttackableUnit {
	static initialize(options: MonsterOptions) {
		return super.initialize(options) as Monster;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<MonsterEvents>;

	declare spawner: JungleCamp;
	declare character: _Monster;

	loader(options: MonsterOptions) {
		super.loader(options);

		//console.log(this);
		this.initialized();

		//this.SetCooldown({slot: 0, cooldown: 0});
		//this.SetCooldown({slot: 1, cooldown: 0});
		//this.SetCooldown({slot: 2, cooldown: 0});
		//this.SetCooldown({slot: 3, cooldown: 0});

		this.eventEmitter.on('noTargetsInRange', () => {
			const packet1 = packets.InstantStop_Attack.create({
				netId: this.netId,
			});
			this.packets.toEveryone(packet1);
		});

		this.spawnAns1();
	}

	constructor(options: MonsterOptions) {
		super(options);
	}

	//SetCooldown({slot, cooldown}){
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
	spawnAns1() {
		const packet1 = packets.CreateNeutral.create({
			netId: this.netId,
			objectNetId: this.netId,
			netNodeId: 0x40,
			position: this.position,
			groupPosition: this.spawner?.position || this.position,
			faceDirectionPosition: this.position,
			name: this.info?.name,
			skinName: this.character.name,
			uniqueName: this.info?.name,
			spawnAnimationName: '',
			team: this.team.id,
			damageBonus: 0,
			healthBonus: 0,
			minionRoamState: 0,
			groupNumber: this.spawner?.team.num,
			buffSideTeamId: 0,
			revealEvent: 0,
			initialLevel: 1,
			spawnDuration: 0,
			spawnTime: 0,
			behaviorTree: 0,
			aiScript: '',
		});
		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.loading);
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
		return this.character?.constructor as typeof _Monster | undefined;
	}

	get rewardExp() {
		let character = this.characterBase;
		if (!character)
			return 0;

		return character.reward.exp;
	}

	get rewardGold() {
		let character = this.characterBase;
		if (!character)
			return 0;

		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	onDieRewards(source: AttackableUnit) {
		console.log('onDieRewards', source.team.id, this.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id == this.team.id || this.killRewarded)
			return;

		this.killRewarded = true;

		if (source instanceof Player) {
			source.progress.expUp(this.rewardExp);
			source.progress.goldUp(this.rewardGold, this);
		}
	}

	onDie(source: AttackableUnit) {
		this.onDieRewards(source);
	}

}
