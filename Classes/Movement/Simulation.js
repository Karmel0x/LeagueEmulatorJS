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
	broadcastVision(allyUnit_team, enemyUnit_id){
		let enemyUnit = global.Units['ALL']['ALL'][enemyUnit_id];
		let visibleForEnemy = this.visibleForTeam[allyUnit_team][enemyUnit_id];
		delete this.visibleForTeam[allyUnit_team][enemyUnit_id];
		if(enemyUnit.visibleForEnemy == visibleForEnemy)
			return;
		enemyUnit.visibleForEnemy = visibleForEnemy;
		global.Teams[allyUnit_team].vision(enemyUnit, visibleForEnemy);
		//for(var allyUnit_id in global.Teams[allyUnit_team].Player){
		//	let allyUnit = global.Teams[allyUnit_team].Player[allyUnit_id];
		//	allyUnit.vision(enemyUnit, visibleForEnemy);
		//}
	}
	visionProcess(){
		//todo: `Object.values(obj).map` for better performance

		const teams = {BLUE: 0, RED: 1};
		//var allyUnit_team = 'BLUE';
		for(var allyUnit_team in teams)
		{
			for(var allyUnit_id in global.Units[allyUnit_team]['ALL']){

				let allyUnit = global.Units[allyUnit_team]['ALL'][allyUnit_id];
				let allyUnit_netId = allyUnit.netId;

				if(!this.moved[allyUnit_netId])
					continue;

				let allyUnit_position = allyUnit.Waypoints[0];
				if(allyUnit_position.x == 0 && allyUnit_position.y == 0)
					continue;//for now
				let allyUnit_visionRange = allyUnit.stats.visionRange || defaultVisionRange;

				//var enemyUnit_team = 'RED';
				for(var enemyUnit_team in teams)
				{
					if(enemyUnit_team == allyUnit_team)
						continue;
		
					for(var enemyUnit_id in global.Units[enemyUnit_team]['ALL']){
						let enemyUnit = global.Units[enemyUnit_team]['ALL'][enemyUnit_id];
						//let enemyUnit_netId = enemyUnit.netId;
						let enemyUnit_position = enemyUnit.Waypoints[0];
						if(enemyUnit_position.x == 0 && enemyUnit_position.y == 0)
							continue;//for now
						let enemyUnit_visionRange = enemyUnit.stats.visionRange || defaultVisionRange;
		
						let dist = allyUnit_position.distanceTo(enemyUnit_position);
						// ? let wplen = dist_allyorenemy && pathfinding.vision(allyUnit_position, enemyUnit_position).waypoints.length < 3;
						if(!this.visibleForTeam[allyUnit_team][enemyUnit_id])
							this.visibleForTeam[allyUnit_team][enemyUnit_id] = dist <= allyUnit_visionRange;
						if(!this.visibleForTeam[enemyUnit_team][allyUnit_id])
							this.visibleForTeam[enemyUnit_team][allyUnit_id] = dist <= enemyUnit_visionRange;
					}
				}
			}
		}
		//console.log(this.visibleForTeam);
		for(var allyUnit_team in this.visibleForTeam){
			for(var enemyUnit_id in this.visibleForTeam[allyUnit_team]){
				this.broadcastVision(allyUnit_team, enemyUnit_id);
			}

		}
	}
	move(unit, diff){
		for(;;){
			if(unit.Waypoints.length < 2 || unit.WaypointsHalt)
				return false;
			//console.log('move', unit.netId, unit.Waypoints[0]);

			let dest = unit.Waypoints[1].clone();
			dest.sub(unit.Waypoints[0]);
			
			let ms = (unit.SpeedParams?.PathSpeedOverride || unit.stats.MoveSpeed.Total) / 1000;
			dest.normalize().multiplyScalar(ms * diff);
			
			let dist = unit.Waypoints[0].distanceTo(unit.Waypoints[1]);
			if(dest.length() > dist)
				unit.Waypoints.shift();//not 100% correct but leave it for now
			else
				unit.Waypoints[0].add(dest);

			//console.log(unit.Waypoints[0], unit.Waypoints[1], dest, diff);
			
			if(unit.callbacks){
				for(let i in unit.callbacks.move){
					if(unit.Waypoints.length < 2 || unit.Waypoints[0].distanceTo(unit.Waypoints[1]) <= unit.callbacks.move[i].options.range)
						unit.callbacks.move[i].function();
				}

				for(let i in unit.callbacks.collision){
					//unit.callbacks.collision[i].options.flags;//todo: flags like self targetable, ally targetable, enemy targetable
					for(var unitId in global.Units['ALL']['ALL']){
						let unit2 = global.Units['ALL']['ALL'][unitId];
						//todo: for better performance we could divide units array to territories
						let dist2 = unit.Waypoints[0].distanceTo(unit2.Waypoints[0]);
						if(dist2 <= ((unit.callbacks.collision[i].options?.range || unit.collisionRadius) + unit2.collisionRadius)){
							unit.callbacks.collision[i].function(unit2);
							if(!unit.callbacks.collision[i])
								break;
						}
					}
				}
			}

			return true;
		}
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
			
			for(var i in global.Units['ALL']['ALL']){
				let unit = global.Units['ALL']['ALL'][i];
				let diff = this.unitDiff(unit);
				if(!diff)
					continue;
				let moved = this.move(unit, diff);
				this.moved[unit.netId] = moved;
			}
			for(var i in global.Missiles){
				let unit = global.Missiles[i];
				let diff = this.unitDiff(unit);
				if(!diff)
					continue;
				//todo: flags like collidable with terrain, with ally units, with enemy units
				let moved = this.move(unit, diff);
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
