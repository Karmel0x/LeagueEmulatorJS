import Unit from '../../units/unit';


export enum TeamId {
	unknown = 0,
	unassigned = 99,
	order = 100,
	chaos = 200,
	neutral = 300,
	max = 400,
};

export enum LaneId {
	// may be inversely
	top = 0,
	mid = 1,
	bot = 2,
	unknown = 11,
};

/**
 * Trait for units which has team
 */
export default class Team {
	owner;

	constructor(owner: Unit, teamId: number, num: number) {
		this.owner = owner;

		this.id = teamId || owner.spawner?.team.id || TeamId.neutral;
		this.num = num || 0;
	}

	id = TeamId.unknown;
	num = 0;

	get teamName() {
		const teamsR = {
			[TeamId.order]: 'order',
			[TeamId.chaos]: 'chaos',
			[TeamId.neutral]: 'neutral',
			[TeamId.max]: 'max',
		};
		return teamsR[this.id as keyof typeof teamsR] || 'unknown';
	}

	getTeam() {
		return TeamId.max;
	}

	/**
	 * Get ally team to this unit  
	 */
	getAllyTeam(): number {
		return this.id;
	}

	static getEnemyTeam(teamId: TeamId) {
		const oppositeTeam = {
			[TeamId.order]: TeamId.chaos,
			[TeamId.chaos]: TeamId.order,
		};
		return oppositeTeam[teamId as keyof typeof oppositeTeam] || TeamId.neutral;
	}

	/**
	 * Get enemy team to this unit
	 */
	getEnemyTeam() {
		return Team.getEnemyTeam(this.id);
	}
}
