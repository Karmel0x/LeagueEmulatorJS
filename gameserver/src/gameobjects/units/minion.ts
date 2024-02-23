
import * as packets from '@workspace/packets/packages/packets';
import UnitList from '../../app/unit-list';

import Unit, { UnitEvents, UnitOptions } from './unit';
import Attackable, { AttackableEvents, IAttackable } from '../extensions/combat/attackable';
import { minionsLanePaths } from '../positions/index';
import MovingUnit, { IMovingUnit, MovingUnitEvents } from '../extensions/traits/moving-unit';
import Player from './player';
import _Minion from '../../game/datamethods/characters/_Minion';
import EventEmitter from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import type Barrack from '../spawners/barrack';
import { LaneId, TeamId } from '../extensions/traits/team';
import * as Measure from '../extensions/measure';

export type MinionOptions = UnitOptions & {
	spawner: Barrack;
};

export type MinionEvents = UnitEvents & AttackableEvents & MovingUnitEvents & {

}

export default class Minion extends Unit implements IMovingUnit {
	static initialize(options: MinionOptions) {
		return super.initialize(options) as Minion;
	}

	eventEmitter = new EventEmitter() as TypedEventEmitter<MinionEvents>;

	combat!: Attackable;
	moving!: MovingUnit;

	//spawner;

	loader(options: MinionOptions) {
		super.loader(options);

		this.combat = new Attackable(this);
		this.moving = new MovingUnit(this);

		//console.log(this);
		this.initialized();

		this.eventEmitter.on('noTargetsInRange', () => {
			const packet1 = packets.InstantStop_Attack.create({
				netId: this.netId,
			});
			this.packets.toEveryone(packet1);

			this.moveLane();
		});

		//this.eventEmitter.emit('noTargetsInRange');//todo
	}

	constructor(options: MinionOptions) {
		super(options);
	}

	destructor() {
		UnitList.remove(this);
	}

	spawn() {
		this.spawner?.spawnUnitAns(this.netId, this.character.id);

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

		let minionLanePath = minionsLanePaths[teamId as keyof typeof minionsLanePaths]?.[laneId];
		if (!minionLanePath)
			return;

		let lanePath = minionLanePath.map(a => a.clone());
		lanePath = Measure.general.getFromNearestToEnd(this, lanePath);

		//@todo make path more precise
		if (lanePath.length > 1)
			lanePath.shift();

		this.moving.setWaypoints(lanePath);
	}



	// on die / death functions ===========================================================

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get rewardExp() {
		let character = this.character.constructor as typeof _Minion;
		return character.reward.exp;
	}

	get rewardGold() {
		let character = this.character.constructor as typeof _Minion;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	onDieRewards(source: Unit) {
		console.log('onDieRewards', source.team.id, this.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id == this.team.id || this.killRewarded)
			return;

		this.killRewarded = true;

		// Experience from minion deaths is split between all champions within 1400 range.
		let range = 1400;
		let enemyUnitsInRange = this.getEnemyUnitsInRange(range);
		let enemyPlayersInRange = enemyUnitsInRange.filter(v => v instanceof Player && v != source);

		let numberOfPlayersToSplitExp = enemyPlayersInRange.length;
		if (source.type == 'Player')
			numberOfPlayersToSplitExp += 1;

		let rewardExp = this.rewardExp;
		if (numberOfPlayersToSplitExp <= 1)
			rewardExp *= 0.92;
		else
			rewardExp *= 1.2;

		rewardExp /= numberOfPlayersToSplitExp;

		// give gold and exp to killer no matter if in range
		if (source.type == 'Player') {
			source.progress.expUp(rewardExp);
			source.progress.goldUp(this.rewardGold, this);
		}

		// give exp to nearby enemies
		enemyPlayersInRange.forEach(enemyUnit => {
			enemyUnit.progress.expUp(rewardExp);
		});
	}

	onDie(source: IAttackable) {
		this.onDieRewards(source);
	}

	// =================================================================================
}
