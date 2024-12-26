
import * as packets from '@repo/packets/list';
import AttackableUnit, { AttackableUnitEvents, AttackableUnitOptions } from './attackable-unit';
import { minionLanePaths } from '../positions/index';
import Player from './player';
import _Minion from '../../game/basedata/characters/minion';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type Barrack from '../spawners/barrack';
import { LaneId, TeamId } from '../extensions/traits/team';
import * as Measure from '../extensions/measure';
import GameObjectList from '../../app/game-object-list';

export type MinionOptions = AttackableUnitOptions & {
	spawner: Barrack;
};

export type MinionEvents = AttackableUnitEvents & {

}

export default class Minion extends AttackableUnit {
	static initialize(options: MinionOptions) {
		return super.initialize(options) as Minion;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<MinionEvents>;

	declare spawner: Barrack;
	declare character: _Minion;

	loader(options: MinionOptions) {
		super.loader(options);

		//console.log(this);
		this.initialized();

		this.eventEmitter.on('noTargetsInRange', () => {
			const packet1 = packets.InstantStop_Attack.create({
				netId: this.netId,
			});
			this.packets.toEveryone(packet1);

			this.moveLane();
		});
	}

	constructor(options: MinionOptions) {
		super(options);
	}

	spawn() {
		if (this.spawner && this.character)
			this.spawner.spawnUnitAns(this.netId, this.character.id);

		super.spawn();
	}

	/**
	 * Set waypoints for the unit to pathing
	 */
	moveLane(teamId: TeamId | undefined = undefined, laneId: LaneId | undefined = undefined) {
		console.log('moveLane', this.constructor.name, this.netId);
		teamId = teamId ?? this.spawner?.team.id;
		laneId = laneId ?? this.spawner?.team.num;

		if (teamId == undefined || laneId == undefined)
			return;

		let minionLanePath = minionLanePaths[teamId as keyof typeof minionLanePaths]?.[laneId];
		if (!minionLanePath)
			return;

		let lanePath = minionLanePath.map(a => a.clone());
		lanePath = Measure.general.getFromNearestToEnd(this, lanePath);

		//@todo make path more precise
		if (lanePath.length > 1)
			lanePath.shift();

		this.moving.setWaypoints(lanePath);
	}

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get characterBase() {
		return this.character?.constructor as typeof _Minion | undefined;
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

		// Experience from minion deaths is split between all champions within 1400 range.
		let range = 1400;
		let thisUnitTeamId = this.team.id;
		let enemyUnitsInRange = GameObjectList.aliveUnits.filter(unit => unit.team.id !== thisUnitTeamId && unit.position.distanceTo(this.position) <= range);
		let enemyPlayersInRange = enemyUnitsInRange.filter(v => v instanceof Player && v != source) as Player[];

		let numberOfPlayersToSplitExp = enemyPlayersInRange.length;
		if (source instanceof Player)
			numberOfPlayersToSplitExp += 1;

		let rewardExp = this.rewardExp;
		if (numberOfPlayersToSplitExp <= 1)
			rewardExp *= 0.92;
		else
			rewardExp *= 1.2;

		rewardExp /= numberOfPlayersToSplitExp;

		// give gold and exp to killer no matter if in range
		if (source instanceof Player) {
			source.progress.expUp(rewardExp);
			source.progress.goldUp(this.rewardGold, this);
		}

		// give exp to nearby enemies
		enemyPlayersInRange.forEach(enemyUnit => {
			enemyUnit.progress.expUp(rewardExp);
		});
	}

	onDie(source: AttackableUnit) {
		this.onDieRewards(source);
	}

}
