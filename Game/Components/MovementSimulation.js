const { Vector2 } = require('three');

// https://leagueoflegends.fandom.com/wiki/Sight#Sight_Ranges
var defaultVisionRange = 1350;

class MovementSimulation {

	Map = new Vector2(14000, 14000);

	visibleForTeam = {
		BLUE: {},
		RED: {},
		//NEUTRAL: {},
	}
	
	broadcastVision(){
		global.units.forEach(unit => {
			let visibleForEnemy = !unit.battle.died && unit.visibleForEnemy2;
			if(unit.visibleForEnemy != visibleForEnemy){
				unit.visibleForEnemy = visibleForEnemy;
				global.Teams[unit.getEnemyTeam()].vision(unit, visibleForEnemy);
			}

			let visibleForTeam = !unit.battle.died && unit.visibleForTeam2;
			if(unit.visibleForTeam != visibleForTeam){
				unit.visibleForTeam = visibleForTeam;
				global.Teams[unit.getAllyTeam()].vision(unit, visibleForTeam);
			}
		});
	}
	visionProcess(){
		const oppositeTeams = {BLUE: 'RED', RED: 'BLUE'};
		for(var allyUnit_team in oppositeTeams){
			var enemyUnit_team = oppositeTeams[allyUnit_team];

			var allyUnits = global.getUnitsF(allyUnit_team);
			var enemyUnits = global.getUnitsF(enemyUnit_team);
			
			allyUnits.forEach(allyUnit => {
				let allyUnit_visionRange = allyUnit.stats.visionRange || defaultVisionRange;
				var visibleUnits = enemyUnits.filter(enemyUnit => {
					return allyUnit.distanceTo(enemyUnit) <= allyUnit_visionRange;
				});
				allyUnit.visibleForEnemy2 = !!visibleUnits.length;
			});
		}

		this.broadcastVision();
	}
	move(unit, diff){
		if(!unit.Movement?.Waypoints || unit.Movement.Waypoints.length < 2 || unit.Movement.WaypointsHalt)
			return false;
		//console.log('move', unit.netId, unit.Movement.Waypoints[0]);

		let dest = unit.Movement.Waypoints[1].clone();
		dest.sub(unit.Movement.Waypoints[0]);
		
		let ms = (unit.Movement?.SpeedParams?.PathSpeedOverride || unit.stats.MoveSpeed.Total) / 1000;
		dest.normalize().multiplyScalar(ms * diff);

		let dist = unit.Movement.Waypoints[0].distanceTo(unit.Movement.Waypoints[1]);
		if(dest.length() > dist)
			unit.Movement.Waypoints.shift();//not 100% correct but leave it for now
		else
			unit.Movement.Waypoints[0].add(dest);

		//console.log(unit.Movement.Waypoints[0], unit.Movement.Waypoints[1], dest, dist, diff);
		return true;
	}
	callbacks(unit, diff){
		if(!unit.callbacks)
			return false;

		for(let i in unit.callbacks.move){
			if(unit.Movement.Waypoints.length < 2 || unit.Movement.Waypoints[0].distanceTo(unit.Movement.Waypoints[1]) <= unit.callbacks.move[i].options.range)
				unit.callbacks.move[i].function();
		}

		for(let i in unit.callbacks.collision){
			//unit.callbacks.collision[i].options.flags;//todo: flags like self targetable, ally targetable, enemy targetable
			var units = global.getUnits();
			for(var unitId in units){
				let unit2 = units[unitId];
				//todo: for better performance we could divide units array to territories
				let dist2 = unit.Position.distanceTo(unit2.Position);
				if(dist2 <= ((unit.callbacks.collision[i].options?.range || unit.collisionRadius) + unit2.collisionRadius)){
					unit.callbacks.collision[i].function(unit2);
					if(!unit.callbacks.collision[i])
						break;
				}
			}
		}

		return true;
	}
	unitDiff(unit){
		let now = performance.now();
		if(!unit.moveTime){
			unit.moveTime = now;
			return 0;
		}
		let diff = now - unit.moveTime;
		unit.moveTime = now;
		return diff;
	}
	async update(){
		for(;;){
			await global.Utilities.wait(20);//lower this?
			this.moved = {};
			
			var units = global.getUnits();
			for(var i in units){
				let unit = units[i];
				let diff = this.unitDiff(unit);
				let moved = this.move(unit, diff);
				if(moved)
					this.callbacks(unit, diff);
				this.moved[unit.netId] = moved;
			}
			for(var i in global.Missiles){
				let unit = global.Missiles[i];
				let diff = this.unitDiff(unit);
				//todo: flags like collidable with terrain, with ally units, with enemy units
				let moved = this.move(unit, diff);
				if(moved)
					this.callbacks(unit, diff);
				//this.moved[unit.netId] = moved;
			}
			this.visionProcess();

		}
	}
	async start(){

		this.update();
	}
}


module.exports = MovementSimulation;
