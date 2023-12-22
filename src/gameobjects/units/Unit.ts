
import slotId from '../../constants/slotId';
import loadingStages from '../../constants/loadingStages';
import Server from '../../app/Server';
import UnitList from '../../app/UnitList';

import GameObject from '../GameObject';
import PUnit from '../extensions/packets/Unit';
import Buffs from '../extensions/traits/Buffs';
import Progress from '../extensions/traits/Progress';
import Rewards from '../extensions/traits/Rewards';
import Stats from '../extensions/traits/Stats';
import Team from '../extensions/traits/Team';
import { UnitOptions, UnitSpawner } from '../GameObjects';
import _Character from '../../game/datamethods/characters/_Character';
import * as Characters from '../../game/leaguedata/characters/index';

export default class Unit extends GameObject {
	static initialize(options: UnitOptions) {
		const unit = new this(options);
		unit.loader(options);
		return unit;
	}

	packets!: PUnit;
	buffs!: Buffs
	progress!: Progress;
	rewards!: Rewards;
	stats!: Stats;
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

		this.packets = new PUnit(this);
		this.buffs = new Buffs(this);
		this.progress = new Progress(this);
		this.stats = new Stats(this);
		this.rewards = new Rewards(this);
		this.team = new Team(this, options.team, options.num);

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
		this.emit('initialized');
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
		if (!this.slots[slotId.A])
			return false;

		if (this.isDead())
			return false;

		return true;
	}

	async update() {
		for (; ;) {
			await Promise.wait(1000);

			if (!Server.game.started)
				continue;

		}
	}

	respawn() {
		this.emit('respawn');
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
	 * team (RED/BLUE/NEUTRAL/ALL)
	 */
	static filterByTeam(targets: Unit[], team: number[] | number = Team.TEAM_MAX) {
		let teams = typeof team === 'number' ? [team] : team;

		if (teams.includes(Team.TEAM_MAX))
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
	getUnits(team = Team.TEAM_MAX) {
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
	getOtherUnits(team = Team.TEAM_MAX) {
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
	getAllyUnitsInRange(range: number, distanceCalcPoint = 'CENTER_TO_CENTER') {
		let measure = this.measure[distanceCalcPoint];
		return measure.filterByRange(this.getAllyUnits(), range);
	}

	/**
	 * Get enemy units in range of this unit
	 */
	getEnemyUnitsInRange(range: number, distanceCalcPoint = 'CENTER_TO_CENTER') {
		let measure = this.measure[distanceCalcPoint];
		return measure.filterByRange(this.getEnemyUnits(), range);
	}

}
