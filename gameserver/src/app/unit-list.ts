
//import unitTypes from '../../constants/unitTypes';

import Team, { TeamId } from '../gameobjects/extensions/traits/team';
import type Unit from '../gameobjects/units/unit';
import type Missile from '../gameobjects/missiles/missile';
import type Barrack from '../gameobjects/spawners/barrack';
import type { NetId } from '@workspace/packets/packages/packets/types/player';

export default class UnitList {
	static lastNetId = 0x40000000;
	static lastUnitId = 0;
	static unitCount = 0;

	static units: Unit[] = [];
	static unitsNetId: { [netId: NetId]: Unit } = {};
	static destroyedUnits: Unit[] = [];

	static unitsCache: { [key: string]: Unit[] } = {};
	static unitsCache_lastUnitId = 0;

	//static baseMissileNetId = 0x60000000;
	static missiles: Missile[] = [];
	static missilesCount = 0;

	static barracks: { [team: string]: Barrack[] } = {
		[TeamId.order]: [],
		[TeamId.chaos]: [],
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
	static getUnits(team = TeamId.max, type = 'ALL') {
		if (team == TeamId.max && type == 'ALL')
			return this.units;

		let key = team + '_' + type;
		if (!this.unitsCache[key] || this.lastUnitId !== this.unitsCache_lastUnitId) {
			this.unitsCache[key] = this.units.filter(unit => {
				// would be better to use bitwise but teams and unitTypes enums are not bitwise
				return (unit.team.id === team || team === TeamId.max) && (unit.type === type || type === 'ALL');
			});
		}
		return this.unitsCache[key];
	}

	static getUnitCount(team = TeamId.max, type = 'ALL') {
		let units = this.getUnits(team, type);
		return units.length;
	}

	static getUnitsF(team = TeamId.max, type = 'ALL') {
		return this.getUnits(team, type);
	}

	static getUnitByNetId(netId: NetId) {
		return this.unitsNetId[netId];
	}
}
