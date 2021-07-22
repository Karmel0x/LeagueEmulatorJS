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
		//for(var allyUnit_id in global.Teams[allyUnit_team].PLAYER){
		//	let allyUnit = global.Teams[allyUnit_team].PLAYER[allyUnit_id];
		//	allyUnit.vision(enemyUnit, visibleForEnemy);
		//}
	}
	visionProcess(){
		const teams = {BLUE: 0, RED: 1};
		//var allyUnit_team = 'BLUE';
		for(var allyUnit_team in teams)
		{
			for(var allyUnit_id in global.Units[allyUnit_team]['ALL']){

				let allyUnit = global.Units[allyUnit_team]['ALL'][allyUnit_id];
				let allyUnit_netId = allyUnit.netId;

				if(!this.moved[allyUnit_netId])
					continue;

				let allyUnit_position = allyUnit.transform.position;
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
						let enemyUnit_position = enemyUnit.transform.position;
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
			if(!unit.Waypoints || unit.Waypoints.length < 2 || unit.WaypointsHalt)
				return false;
			//console.log('move', unit.netId, unit.transform.position);

			let dist = unit.transform.position.distanceTo(unit.Waypoints[1]);
			if(unit.moveCallback && dist <= unit.moveCallback_range){
				unit.moveCallback();
				continue;
			}
			if(unit.collisionCallback){
				//todo: flags like self targetable, ally targetable, enemy targetable
				for(var i in global.Units['ALL']['ALL']){
					let unit2 = global.Units['ALL']['ALL'][i];
					let dist2 = unit.transform.position.distanceTo(unit2.transform.position);
					if(dist2 <= (unit.collisionCallback_range + unit2.collisionRadius)){
						unit.collisionCallback(unit2);
						break;// todo: not break if can hit more targets
					}
				}
				//continue;
			}
			if(unit.Waypoints.length > 1 && dist < 0.1){
				console.log(unit.transform.position);
				unit.Waypoints.shift();
				continue;
			}

			let ms = unit.stats.MoveSpeed.Total / 1000;

			let dest = unit.Waypoints[1].clone();
			dest.sub(unit.transform.position);
			dest.normalize().multiplyScalar(ms * diff);

			if(dest.length() > dist)
				unit.transform.position = unit.Waypoints[1];//not 100% correct but leave it for now
			else
				unit.transform.position.add(dest);

			//console.log(unit.transform.position, unit.Waypoints[1], dest, diff);

			return true;
		}
	}
	async update(){
		for(;;){
			let time = performance.now();
			await global.Utilities.wait(20);//lower this?
			this.moved = {};
			
			for(var i in global.Units['ALL']['ALL']){
				let unit = global.Units['ALL']['ALL'][i];
				let diff = performance.now() - time;
				let moved = this.move(unit, diff);
				this.moved[unit.netId] = moved;
			}
			for(var i in global.Missiles){
				let unit = global.Missiles[i];
				let diff = performance.now() - time;
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
