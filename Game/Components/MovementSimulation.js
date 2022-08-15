const { Vector2 } = require('three');
const PositionHelper = require('../../Functions/PositionHelper');

// https://leagueoflegends.fandom.com/wiki/Sight#Sight_Ranges
var defaultVisionRange = 1350;

/**
 * @todo a lot of stuff to create here
 * and a lot of stuff to improve here
 * maybe move this to IMovable ?
 */
class MovementSimulation {

	Map = new Vector2(14000, 14000);

	visibleForTeam = {
		BLUE: {},
		RED: {},
		//NEUTRAL: {},
	}
	
	/**
	 * Broadcast vision for enemy
	 */
	broadcastVision(){
		global.units.forEach(unit => {
			let visibleForEnemy = !unit.died && unit.visibleForEnemy2;
			if(unit.visibleForEnemy != visibleForEnemy){
				unit.visibleForEnemy = visibleForEnemy;
				global.Teams[unit.getEnemyTeam()].vision(unit, visibleForEnemy);
			}

			let visibleForTeam = !unit.died && unit.visibleForTeam2;
			if(unit.visibleForTeam != visibleForTeam){
				unit.visibleForTeam = visibleForTeam;
				global.Teams[unit.getAllyTeam()].vision(unit, visibleForTeam);
			}
		});
	}

	/**
	 * Checks if unit is visible for enemy and broadcasting it
	 */
	visionProcess(){
		const oppositeTeams = {BLUE: 'RED', RED: 'BLUE'};
		for(var allyUnit_team in oppositeTeams){
			var enemyUnit_team = oppositeTeams[allyUnit_team];

			var allyUnits = global.getUnitsF(allyUnit_team);
			var enemyUnits = global.getUnitsF(enemyUnit_team);
			
			allyUnits.forEach(allyUnit => {
				let allyUnit_visionRange = allyUnit.visionRange || defaultVisionRange;
				var visibleUnits = enemyUnits.filter(enemyUnit => {
					return allyUnit.distanceTo(enemyUnit) <= allyUnit_visionRange;
				});
				allyUnit.visibleForEnemy2 = !!visibleUnits.length;
			});
		}

		this.broadcastVision();
	}

	/**
	 * Actually move unit
	 * @param {Unit|Missile} unit 
	 * @param {Number} diff 
	 * @returns {Boolean} hasMoved
	 */
	move(unit, diff){
		if(unit.followUnit){
			if(unit.distanceTo(unit.followUnit) > (unit.followRange || 1))
				unit.waypoints = [unit.position, unit.followUnit.position.clone()];
			else
				unit.followUnit = false;
		}
		if(!unit.waypoints || unit.waypoints.length < 2 || unit.WaypointsHalt)
			return false;
		//console.log('move', unit.netId, unit.waypoints[0]);

		let dest = unit.waypoints[1].clone();
		dest.sub(unit.waypoints[0]);
		
		let ms = (unit.speedParams?.pathSpeedOverride || unit.moveSpeed.total) / 1000;
		dest.normalize().multiplyScalar(ms * diff);

		let dist = unit.waypoints[0].distanceTo(unit.waypoints[1]);
		if(dest.length() > dist)
			unit.waypoints.shift();//not 100% correct but leave it for now
		else
			unit.waypoints[0].add(dest);

		//console.log(unit.waypoints[0], unit.waypoints[1], dest, dist, diff);
		return true;
	}

	/**
	 * Called if unit has moved to call unit movement callbacks
	 * @param {Unit|Missile} unit 
	 * @param {Number} diff 
	 */
	callbacks(unit, diff){

		if(unit.waypoints.length < 2){
			unit.emit('reachDestination');
		}

		if(!unit.callbacks)
			return false;

		for(let i in unit.callbacks.move){
			if(unit.waypoints.length < 2 || unit.waypoints[0].distanceTo(unit.waypoints[1]) <= unit.callbacks.move[i].options.range)
				unit.callbacks.move[i].function();
		}

		for(let i in unit.callbacks.collision){
			//todo: flags like self targetable, ally targetable, enemy targetable
			//unit.callbacks.collision[i].options.flags;
			var units = global.getUnits();
			for(var unitId in units){
				let unit2 = units[unitId];
				//todo: for better performance we could divide units array to territories
				let dist2 = unit.position.distanceTo(unit2.position);
				if(dist2 <= ((unit.callbacks.collision[i].options?.range || unit.collisionRadius) + unit2.collisionRadius)){
					unit.callbacks.collision[i].function(unit2);
					if(!unit.callbacks.collision[i])
						break;
				}
			}
		}

		return true;
	}

	/**
	 * Get unit elapsed time in ms since last movement update
	 * @param {Unit|Missile} unit 
	 * @returns {Number}
	 */
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

	/**
	 * Movement main loop for units to make them move
	 */
	async update(){
		for(;;){
			await Promise.wait(20);//lower this?
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
