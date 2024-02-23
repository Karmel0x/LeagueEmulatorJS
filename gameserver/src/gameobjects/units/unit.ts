
import { SlotId } from '../../constants/slot-id';
import Server from '../../app/server';
import UnitList from '../../app/unit-list';

import GameObject, { GameObjectEvents, GameObjectOptions } from '../game-object';
import PUnit from '../extensions/packets/unit';
import Buffs from '../extensions/traits/buffs';
import Progress from '../extensions/traits/progress';
import Rewards from '../extensions/traits/rewards';
import StatsUnit, { StatsUnitOptions } from '../extensions/stats/unit';
import Team, { LaneId, TeamId } from '../extensions/traits/team';
import _Character from '../../game/datamethods/characters/_Character';
import * as Characters from '@workspace/gamedata/characters/index';
import { EventEmitter } from 'node:events';
import TypedEventEmitter from 'typed-emitter';
import { UnitSpawner } from '../spawners/spawner';
import * as Measure from '../extensions/measure';


export type UnitOptions = GameObjectOptions & {
	spawner?: UnitSpawner;
	character: string;
	team?: number;
	num?: number;
	info?: object;

	stats?: StatsUnitOptions;
};

export type UnitEvents = GameObjectEvents & {
	'die': (source: Unit) => void;
	'respawn': () => void;
}

export default class Unit extends GameObject {
	static initialize(options: UnitOptions) {
		const unit = new this(options);
		unit.loader(options);
		return unit;
	}

	static objects = [];

	eventEmitter = new EventEmitter() as TypedEventEmitter<UnitEvents>;

	declare stats: StatsUnit;
	packets!: PUnit;
	buffs!: Buffs;
	progress!: Progress;
	rewards!: Rewards;
	team!: Team;

	id = 0;
	died = 0;

	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

	callbacks = {
		move: {},
		collision: {},
	};

	slots: { [s: string]: any; } = {};

	character?: _Character;

	switchCharacter(characterName: string) {
		let Character = Characters[characterName as keyof typeof Characters] as typeof _Character;
		if (!Character)
			return;

		let character = new Character(this);
		this.character = character;
	}

	spawner?: UnitSpawner;

	loader(options: UnitOptions) {
		this.switchCharacter(options.character);
		this.info = options.info || {};

		this.packets = this.packets || new PUnit(this);
		this.buffs = new Buffs(this);
		this.progress = new Progress(this);
		this.stats = this.stats || new StatsUnit(this, options.stats || this.character?.stats || {});
		this.rewards = new Rewards(this);
		this.team = new Team(this, options.team ?? TeamId.unknown, options.num || LaneId.unknown);

		UnitList.append(this);
		console.debug(Date.now(), 'Created Unit', this.constructor.name, this.netId);
		console.log('UnitList.unitCount', UnitList.unitCount);
		//console.log(UnitList.units);

		this.update();
	}

	constructor(options: UnitOptions) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		super(options);
		this.options = options;
		this.spawner = options.spawner;
	}

	destructor() {
		// todo
		//UnitList.remove(this);
	}

	initialized() {
		console.log('initialized', this.constructor.name, this.netId);
		this.eventEmitter.emit('initialized');
		//this.progress.levelUp();
		this.spawn();
		this.loop();
	}

	spawn() {
		this.respawn();
	}

	async loop() {

	}

	ACTION = 0;

	/**
	 * Returns if unit is dead
	 */
	isDead() {
		return this.died;
	}

	canBeAttacked() {
		return false;
	}

	/**
	 * Returns if unit is able to move
	 */
	isAbleForMoving() {
		if (!this.moving)
			return false;

		if (this.isDead())
			return false;

		return true;
	}

	/**
	 * Returns if unit is able to attack
	 */
	isAbleForAttacking() {
		if (!this.slots[SlotId.A])
			return false;

		if (this.isDead())
			return false;

		return true;
	}

	async update() {
		for (; ;) {
			await Promise.delay(1000);

			if (!Server.game.started)
				continue;

		}
	}

	respawn() {
		this.eventEmitter.emit('respawn');
		this.died = 0;

		this.stats.health.current = this.stats.health.total;
		this.stats.mana.current = this.stats.mana.total;

		if (this.position)
			this.position.copy(this.spawnPosition);

		this.packets.OnEnterLocalVisibilityClient();

		Server.teams[this.team.id].vision(this, true);
	}

	// ==================================================

	/**
	 * Filter units by team
	 */
	static filterByTeam(targets: Unit[], team: number[] | number = TeamId.max) {
		let teams = typeof team === 'number' ? [team] : team;

		if (teams.includes(TeamId.max))
			return targets;

		return targets.filter(target => teams.includes(target.team.id));
	}


	/**
	 * Remove this unit from array
	 */
	removeThisFromArray(array: Unit[]) {
		let index = array.indexOf(this);
		if (index === -1)
			return;

		array.splice(index, 1);
	}

	/**
	 * Get all units
	 */
	getUnits(team = TeamId.max) {
		return UnitList.getUnits(team);
	}
	/**
	 * Get ally units to this unit
	 */
	getAllyUnits() {
		let thisTeamId = this.team.id;
		return UnitList.units.filter(unit => unit.team.id == thisTeamId);
		//return this.getUnits(this.getAllyTeam());
	}
	/**
	 * Get enemy units to this unit
	 */
	getEnemyUnits() {
		let thisTeamId = this.team.id;
		return UnitList.units.filter(unit => unit.team.id != thisTeamId);
		//return this.getUnits(this.team.getEnemyTeam());
	}

	/**
	 * Get all units except this
	 */
	getOtherUnits(team = TeamId.max) {
		let units = this.getUnits(team);
		this.removeThisFromArray(units);
		return units;
	}
	/**
	 * Get ally units except this
	 */
	getOtherAllyUnits() {
		return this.getOtherUnits(this.team.getAllyTeam());
	}

	/**
	 * Get ally units in range of this unit
	 */
	getAllyUnitsInRange(range: number, measure = Measure.centerToCenter) {
		return measure.filterByRange(this, this.getAllyUnits(), range);
	}

	/**
	 * Get enemy units in range of this unit
	 */
	getEnemyUnitsInRange(range: number, measure = Measure.centerToCenter) {
		return measure.filterByRange(this, this.getEnemyUnits(), range);
	}

}
