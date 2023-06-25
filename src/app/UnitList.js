
//import unitTypes from '../../constants/unitTypes';
//import teamIds from '../../constants/teamIds';

/**
 * @typedef {import('../gameobjects/units/Unit')} Unit
 * @typedef {import('../gameobjects/missiles/Missile')} Missile
 * @typedef {import('../gameobjects/others/Barrack')} Barrack
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
		BLUE: [],
		RED: [],
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

		var index = this.units.indexOf(unit);
		if (index !== -1)
			this.units.splice(index, 1);

		this.destroyedUnits.push(unit);
	}

	/**
	 * Get units by team and type
	 * @todo make caching more advanced
	 */
	static getUnits(team = 'ALL', type = 'ALL') {
		if (team == 'ALL' && type == 'ALL')
			return this.units;

		var key = team + '_' + type;
		if (!this.unitsCache[key] || this.lastUnitId !== this.unitsCache_lastUnitId) {
			this.unitsCache[key] = this.units.filter(unit => {
				// would be better to use bitwise but teamIds and unitTypes enums are not bitwise
				return (unit.teamName === team || team === 'ALL') && (unit.type === type || type === 'ALL');
			});
		}
		return this.unitsCache[key];
	}

	static getUnitCount(team = 'ALL', type = 'ALL') {
		var units = this.getUnits(team, type);
		return units.length;
	}

	static getUnitsF(team = 'ALL', type = 'ALL') {
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
