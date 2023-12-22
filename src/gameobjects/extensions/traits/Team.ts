import Unit from '../../units/Unit';

/**
 * Trait for units which has team
 */
export default class Team {

	static TEAM_UNKNOWN = 0;
	static TEAM_BLUE = 100;
	//static TEAM_ORDER = 100;
	static TEAM_RED = 200;
	//static TEAM_CHAOS = 200;
	static TEAM_NEUTRAL = 300;
	static TEAM_MAX = 400;

	owner;

	constructor(owner: Unit, teamId: number, num: number) {
		this.owner = owner;

		this.id = teamId || owner.spawner.team.id || Team.TEAM_NEUTRAL;
		this.num = num || 0;
	}

	id = Team.TEAM_UNKNOWN;
	num = 0;

	get teamName() {
		const teamsR = {
			//[Team.TEAM_UNKNOWN]: 'UNKNOWN',
			[Team.TEAM_BLUE]: 'BLUE',
			[Team.TEAM_RED]: 'RED',
			[Team.TEAM_NEUTRAL]: 'NEUTRAL',
			[Team.TEAM_MAX]: 'MAX',
		};
		return teamsR[this.id] || 'UNKNOWN';
	}

	getTeam() {
		return Team.TEAM_MAX;
	}

	/**
	 * Get ally team to this unit  
	 * returns (RED/BLUE/NEUTRAL)
	 */
	getAllyTeam(): number {
		return this.id;
	}

	/**
	 * teamId (RED/BLUE/NEUTRAL)
	 */
	static getEnemyTeam(teamId: number) {
		const oppositeTeam = {
			[Team.TEAM_BLUE]: Team.TEAM_RED,
			[Team.TEAM_RED]: Team.TEAM_BLUE,
		};
		return oppositeTeam[teamId] || Team.TEAM_NEUTRAL;
	}

	/**
	 * Get enemy team to this unit
	 */
	getEnemyTeam() {
		return Team.getEnemyTeam(this.id);
	}
}
