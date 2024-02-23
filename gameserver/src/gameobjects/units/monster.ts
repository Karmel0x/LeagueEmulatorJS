
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../constants/loading-stages';
import Server from '../../app/server';

import Unit, { UnitEvents, UnitOptions } from './unit';
import Spellable, { SpellableEvents } from '../extensions/combat/spellable';
import Team, { TeamId } from '../extensions/traits/team';
import MovingUnit, { IMovingUnit, MovingUnitEvents } from '../extensions/traits/moving-unit';
import _Monster from '../../game/datamethods/characters/_Monster';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type JungleCamp from '../spawners/jungle-camp';
import { IAttackable } from '../extensions/combat/attackable';


export type MonsterOptions = UnitOptions & {
	spawner: JungleCamp;
};

export type MonsterEvents = UnitEvents & SpellableEvents & MovingUnitEvents & {

}

export default class Monster extends Unit implements IMovingUnit {
	static initialize(options: MonsterOptions) {
		return super.initialize(options) as Monster;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<MonsterEvents>;

	combat!: Spellable;
	moving!: MovingUnit;

	loader(options: MonsterOptions) {
		super.loader(options);

		this.combat = new Spellable(this);
		this.moving = new MovingUnit(this);

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
			name: this.info.name,
			skinName: this.character.name,
			uniqueName: this.info.name,
			spawnAnimationName: '',
			team: this.team,
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

	get rewardExp() {
		let character = this.character.constructor as _Monster;
		return character.reward.exp;
	}

	get rewardGold() {
		let character = this.character.constructor as _Monster;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	onDieRewards(source: IAttackable) {
		console.log('onDieRewards', source.team.id, this.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id == this.team.id || this.killRewarded)
			return;

		this.killRewarded = true;

		if (source.type == 'Player') {
			source.progress.expUp(this.rewardExp);
			source.progress.goldUp(this.rewardGold, this);
		}
	}

	onDie(source: IAttackable) {
		this.onDieRewards(source);
	}

}
