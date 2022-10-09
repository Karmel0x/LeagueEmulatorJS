
require('../../Core/init_utilities')();

global.Network = {
	createPacket: () => {return {};},
	sendPacketP: () => {return {};},
};

global.Game = {
	initialized: Date.now() / 1000,
	loaded: true,
	started: false,
	paused: false,
};

global.Game.Timer = () => {
	if(!global.Game.started)
		return 0;
		
	return Date.now() / 1000 - global.Game.started;
};

class TestsTeams {
	constructor(team){
		this.team = team;
	}

	sendPacket(){return {};}
	sendPacket_withVision(){return {};}

	vision(unit, visibleFor){
		unit.tests = unit.tests || {};
		//console.log(unit);
		console.log('vision', {
			unit: {
				name: unit.constructor.name,
				netId: unit.netId,
				visible: unit.tests['visibleFor' + this.team],
				team: unit.teamName,
				position: unit.position,
			},
			visibleFor,
			team: this.team,
		});
		//console.trace();

		if(unit.tests['visibleFor' + this.team] == visibleFor){
			console.error(`test failed :: passed same visibleFor argument two times`);
			console.error(`unit.tests['visibleFor' + this.team] == visibleFor ::`, unit.tests['visibleFor' + this.team], '==', visibleFor);
			process.exit();
		}
		unit.tests['visibleFor' + this.team] = visibleFor;
	}
};

global.Teams = {
	BLUE: new TestsTeams('BLUE'),
	RED: new TestsTeams('RED'),
	ALL: new TestsTeams('ALL'),
}
