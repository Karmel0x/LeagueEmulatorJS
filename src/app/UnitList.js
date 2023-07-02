
//import unitTypes from '../../constants/unitTypes';

const Team = require('../gameobjects/extensions/traits/Team');

/**
 * @typedef {import('../gameobjects/units/Unit')} Unit
 * @typedef {import('../gameobjects/missiles/Missile')} Missile
 * @typedef {import('../gameobjects/spawners/Barrack')} Barrack
 */

class UnitList {
	static lastNetId = 0x40000000;
	static lastUnitId = 0;
	static unitCount = 0;

	/**
	 * @type {Unit[]}
	 */
	static units = [];

	/**
	 * @type {Object.<number, Unit>}
	 */
	static unitsNetId = {};

	/**
	 * @type {Unit[]}
	 */
	static destroyedUnits = [];

	/**
	 * @type {Object.<string, Unit[]>}
	 */
	static unitsCache = {};
	static unitsCache_lastUnitId = 0;

	//static baseMissileNetId = 0x60000000;
	/**
	 * @type {Missile[]}
	 */
	static missiles = [];
	static missilesCount = 0;

	/**
	 * @type {Object.<string, Barrack[]>}
	 */
	static barracks = {
		[Team.TEAM_BLUE]: [],
		[Team.TEAM_RED]: [],
	};

	/**
	 * @param {Unit} unit
	 */
	static append(unit) {
		unit.id = this.lastUnitId++;
		++this.unitCount;

		this.units.push(unit);
		this.unitsNetId[unit.netId] = unit;
	}

	/**
	 * @param {Unit} unit
	 */
	static remove(unit) {
		--this.unitCount;

		let index = this.units.indexOf(unit);
		if (index !== -1)
			this.units.splice(index, 1);

		this.destroyedUnits.push(unit);
	}

	/**
	 * Get units by team and type
	 * @todo make caching more advanced
	 */
	static getUnits(team = Team.TEAM_MAX, type = 'ALL') {
		if (team == Team.TEAM_MAX && type == 'ALL')
			return this.units;

		let key = team + '_' + type;
		if (!this.unitsCache[key] || this.lastUnitId !== this.unitsCache_lastUnitId) {
			this.unitsCache[key] = this.units.filter(unit => {
				// would be better to use bitwise but teams and unitTypes enums are not bitwise
				return (unit.team.id === team || team === Team.TEAM_MAX) && (unit.type === type || type === 'ALL');
			});
		}
		return this.unitsCache[key];
	}

	static getUnitCount(team = Team.TEAM_MAX, type = 'ALL') {
		let units = this.getUnits(team, type);
		return units.length;
	}

	static getUnitsF(team = Team.TEAM_MAX, type = 'ALL') {
		return this.getUnits(team, type);
	}

	/**
	 * 
	 * @param {number} netId 
	 * @returns 
	 */
	static getUnitByNetId(netId) {
		return this.unitsNetId[netId];
	}
}

module.exports = UnitList;
