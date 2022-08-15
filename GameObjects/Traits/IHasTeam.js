
const teamIds = require('../../Constants/teamIds');

const teamIdsR = {
	0: 'UNKNOWN',
	100: 'BLUE',//ORDER
	200: 'RED',//CHAOS
	300: 'NEUTRAL',
	400: 'MAX',
};

module.exports = (I) => class IHasTeam extends I {

	_team = teamIds.NEUTRAL;
	_teamName = 'NEUTRAL';
	get team(){
		return this._team;
	}
	get teamName(){
		return this._teamName;
	}
	set team(team){
		if(typeof team == 'string')
			team = teamIds[team] || teamIds.NEUTRAL;

		this._team = team;
		this._teamName = teamIdsR[team] || 'NEUTRAL';
	}
	num = 0;


	constructor(...args){
		super(...args);

		this.team = args[0].team || teamIds.NEUTRAL;
		this.num = args[0].num || 0;
	}

	getTeam(){
		return 'ALL';
	}
	/**
	 * Get ally team to this unit
	 * @returns {String} (RED/BLUE/NEUTRAL)
	 */
	getAllyTeam(){
		return this.teamName;
	}
	static getEnemyTeam(team){
		const oppositeTeam = {'BLUE': 'RED', 'RED': 'BLUE'};
		return oppositeTeam[team] || 'NEUTRAL';
	}
	/**
	 * Get enemy team to this unit
	 * @returns {String} (RED/BLUE/NEUTRAL)
	 */
	getEnemyTeam(){
		return this.constructor.getEnemyTeam(this.teamName);
	}
};
