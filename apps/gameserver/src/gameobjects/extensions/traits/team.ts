import Server from '../../../app/server';
import type Teams from '../../../game/initializers/teams';
import GameObject from '../../game-object';


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
export default class TeamArrangement {
	owner;

	constructor(owner: GameObject, teamId: number, num: number) {
		this.owner = owner;

		this.id = teamId ?? TeamId.neutral;
		this.num = num ?? 0;
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

	getTeamId(): number {
		return this.id;
	}

	getTeam(): Teams | undefined {
		return Server.teams[this.id];
	}

	static getEnemyTeamId(teamId: TeamId) {
		const oppositeTeam = {
			[TeamId.order]: TeamId.chaos,
			[TeamId.chaos]: TeamId.order,
		};
		return oppositeTeam[teamId as keyof typeof oppositeTeam] || TeamId.unknown;
	}

	/**
	 * Get enemy team to this unit
	 */
	getEnemyTeamId() {
		return TeamArrangement.getEnemyTeamId(this.id);
	}

	getEnemyTeam(): Teams | undefined {
		return Server.teams[TeamArrangement.getEnemyTeamId(this.id)];
	}

}
