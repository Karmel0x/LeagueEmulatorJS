
const teamIds = require('../../constants/teamIds');

const teamIdsR = {
	0: 'UNKNOWN',
	100: 'BLUE',//ORDER
	200: 'RED',//CHAOS
	300: 'NEUTRAL',
	400: 'MAX',
};

/**
 * Trait for units which has team
 * @mixin
 * @param {GameObject} I
 */
module.exports = (I) => class IHasTeam extends I {
	/**
	 * simply usage:
	 * this.team = {string | number}; sets team by id or name
	 * this.teamId; returns team id
	 * this.teamName; returns team name
	 */

	/**
	 * @private
	 */
	_team = {
		_id: teamIds.NEUTRAL,
		_name: 'NEUTRAL',

		get id() {
			return this._id;
		},
		set id(id) {
			this._id = id;
			this._name = teamIdsR[id];
		},

		get name() {
			return this._name;
		},
		set name(name) {
			this._id = teamIds[name];
			this._name = name;
		}
	};

	/**
	 * @returns {Object} team
	 */
	get team() {
		return this._team;
	}

	/**
	 * @param {string | number | Object} team
	 */
	set team(team) {
		if (typeof team == 'string')
			this._team.name = team;
		else if (typeof team == 'number')
			this._team.id = team;
		else {
			this._team.id = team.id;
			this._team.name = team.name;
		}
	}

	/**
	 * @param {number} id
	 */
	set teamId(id) {
		this._team.id = id;
	}

	/**
	 * @returns {number} id
	 */
	get teamId() {
		return this._team.id;
	}

	/**
	 * @param {string} name
	 */
	set teamName(name) {
		this._team.name = name;
	}

	/**
	 * @returns {string} name
	 */
	get teamName() {
		return this._team.name;
	}


	num = 0;


	constructor(options) {
		super(options);

		this.team = options.team || options.spawner.team || 'NEUTRAL';
		this.num = options.num || 0;
	}

	getTeam() {
		return 'ALL';
	}

	/**
	 * Get ally team to this unit
	 * @returns {string} (RED/BLUE/NEUTRAL)
	 */
	getAllyTeam() {
		return this.teamName;
	}

	static getEnemyTeam(teamName) {
		const oppositeTeam = { 'BLUE': 'RED', 'RED': 'BLUE' };
		return oppositeTeam[teamName] || 'NEUTRAL';
	}

	/**
	 * Get enemy team to this unit
	 * @returns {string} (RED/BLUE/NEUTRAL)
	 */
	getEnemyTeam() {
		return this.constructor.getEnemyTeam(this.teamName);
	}
};
