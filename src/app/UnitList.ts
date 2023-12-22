
//import unitTypes from '../../constants/unitTypes';

import Team from '../gameobjects/extensions/traits/Team';
import Unit from '../gameobjects/units/Unit';
import Missile from '../gameobjects/missiles/Missile';
import Barrack from '../gameobjects/spawners/Barrack';

class UnitList {
	static lastNetId = 0x40000000;
	static lastUnitId = 0;
	static unitCount = 0;

	static units: Unit[] = [];
	static unitsNetId: { [netId: number]: Unit } = {};
	static destroyedUnits: Unit[] = [];

	static unitsCache: { [key: string]: Unit[] } = {};
	static unitsCache_lastUnitId = 0;

	//static baseMissileNetId = 0x60000000;
	static missiles: Missile[] = [];
	static missilesCount = 0;

	static barracks: { [team: string]: Barrack[] } = {
		[Team.TEAM_BLUE]: [],
		[Team.TEAM_RED]: [],
	};

	static append(unit: Unit) {
		unit.id = this.lastUnitId++;
		++this.unitCount;

		this.units.push(unit);
		this.unitsNetId[unit.netId] = unit;
	}

	static remove(unit: Unit) {
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

	static getUnitByNetId(netId: number) {
		return this.unitsNetId[netId];
	}
}

export default UnitList;
