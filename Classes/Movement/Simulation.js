const { Vector2 } = require('three');


class MovementSimulation {

	Map = new Vector2(14000, 14000);
	//Vision = {
	//	BLUE: {},
	//	RED: {},
	//	NEUTRAL: {},
	//}
	//vision_enter(){
	//	console.log('enters vision', this.netId, target.netId);
	//}
	//vision_leave(){
	//	console.log('leaves vision', this.netId, target.netId);
	//}
	//vision(enters){
	//	if(enters){
	//		if(this.vision_inRangeUnits.includes(target.netId))
	//			return;
	//		this.vision_inRangeUnits.push(target.netId);
//
	//		this.vision_enter();
	//	}else{
	//		if(!this.vision_inRangeUnits.includes(target.netId))
	//			return;
//
	//		if((index = array.indexOf(target.netId)) > -1)
	//			array.splice(index, 1);
//
	//		this.vision_leave();
	//	}
	//}
	//visionProcess(){
	//    for(var i in global.UnitsByTeam){
	//        var unitsVision = {};
	//        for(var j in global.UnitsByTeam[i]){
	//            for(var k in global.UnitsByTeam){
	//                if(i == k)
	//                    continue;
	//                for(var o in global.UnitsByTeam[k]){
	//                    unitsVision[global.UnitsByTeam[k][o].netId] = unitsVision[global.UnitsByTeam[k][o].netId] || global.UnitsByTeam[i][j].transform.position.distanceTo(global.UnitsByTeam[k][o].transform.position) <= (global.UnitsByTeam[i][j].stats.visionRange || 600);
	//                }
	//            }
	//        }
	//        for(var j in global.UnitsByTeam[i]){
	//            if(global.UnitsByTeam[i][j].unit.type != 'PLAYER')
	//                continue;
	//            for(var k in global.UnitsByTeam){
	//                if(i == k)
	//                    continue;
	//                    
	//                for(var o in global.UnitsByTeam[k]){
	//                    global.UnitsByTeam[i][j].vision(global.UnitsByTeam[k][o], unitsVision[global.UnitsByTeam[k][o].netId]);
	//                }
	//            }
	//        }
	//    }
	//}
	//visionProcess(){
	//    this.visibleForTeam = {
	//        BLUE: {},
	//        RED: {},
	//        //NEUTRAL: {},
	//    }
	//    for(var j in global.UnitsByTeam['BLUE']){
	//        let allyUnit = global.UnitsByTeam['BLUE'][j];
	//        let allyUnit_position = allyUnit.transform.position;
	//        let allyUnit_visionRange = allyUnit.stats.visionRange || 600;
	//
	//        for(var o in global.UnitsByTeam['RED']){
	//            let enemyUnit = global.UnitsByTeam['RED'][o];
	//            if(this.visibleForTeam['BLUE'][enemyUnit.netId])
	//                continue;
	//
	//            this.visibleForTeam['BLUE'][enemyUnit.netId] = allyUnit_position.distanceTo(enemyUnit.transform.position) <= allyUnit_visionRange;
	//        }
	//    }
	//    for(var j in global.UnitsByTeam['BLUE']){
	//        let allyUnit = global.UnitsByTeam['BLUE'][j];
	//        if(allyUnit.unit.type != 'PLAYER')
	//            continue;
	//                
	//        for(var o in global.UnitsByTeam['RED']){
	//            let enemyUnit = global.UnitsByTeam['RED'][o];
	//            allyUnit.vision(enemyUnit, this.visibleForTeam['BLUE'][enemyUnit.netId]);
	//        }
	//    }
	//}
	//isSeesOrSeen(allyUnit){
	//	let allyUnit_netId = allyUnit.netId;
	//	let allyUnit_team = allyUnit.unit.team;
	//	let allyUnit_position = allyUnit.transform.position;
	//	let allyUnit_visionRange = allyUnit.stats.visionRange || 600;
//
	//	for(var enemyUnit_team in global.UnitsByTeam){
	//		if(enemyUnit_team == allyUnit_team)
	//			continue;
//
	//		for(var enemyUnit_id in global.UnitsByTeam[enemyUnit_team]){
	//			let enemyUnit = global.UnitsByTeam[enemyUnit_team][enemyUnit_id];
	//			let enemyUnit_netId = enemyUnit.netId;
	//			let enemyUnit_position = enemyUnit.transform.position;
	//			let enemyUnit_visionRange = enemyUnit.stats.visionRange || 600;
//
	//			let dist = allyUnit_position.distanceTo(enemyUnit_position);
	//			if(!this.visibleForTeam[allyUnit_team][enemyUnit_netId])
	//				this.visibleForTeam[allyUnit_team][enemyUnit_netId] = dist <= allyUnit_visionRange;
	//			if(!this.visibleForTeam[enemyUnit_team][allyUnit_netId])
	//				this.visibleForTeam[enemyUnit_team][allyUnit_netId] = dist <= enemyUnit_visionRange;
	//		}
	//	}
	//}
	visibleForTeam = {
		BLUE: {},
		RED: {},
		//NEUTRAL: {},
	}
	broadcastVision(allyUnit_team, enemyUnit_id){
		let enemyUnit = global.Units[enemyUnit_id];
		let visibleForEnemy = this.visibleForTeam[allyUnit_team][enemyUnit_id];
		delete this.visibleForTeam[allyUnit_team][enemyUnit_id];
		if(enemyUnit.visibleForEnemy == visibleForEnemy)
			return;
		enemyUnit.visibleForEnemy = visibleForEnemy;

		for(var allyUnit_id in global.PlayersByTeam[allyUnit_team]){
			let allyUnit = global.PlayersByTeam[allyUnit_team][allyUnit_id];
			allyUnit.vision(enemyUnit, visibleForEnemy);
		}
	}
	visionProcess(){
		for(var allyUnit_team in global.UnitsByTeam){
			for(var allyUnit_id in global.UnitsByTeam[allyUnit_team]){

				let allyUnit = global.UnitsByTeam[allyUnit_team][allyUnit_id];
				let allyUnit_netId = allyUnit.netId;

				if(!this.moved[allyUnit_netId])
					continue;

				let allyUnit_position = allyUnit.transform.position;
				let allyUnit_visionRange = allyUnit.stats.visionRange || 600;
		
				for(var enemyUnit_team in global.UnitsByTeam){
					if(enemyUnit_team == allyUnit_team)
						continue;
		
					for(var enemyUnit_id in global.UnitsByTeam[enemyUnit_team]){
						let enemyUnit = global.UnitsByTeam[enemyUnit_team][enemyUnit_id];
						//let enemyUnit_netId = enemyUnit.netId;
						let enemyUnit_position = enemyUnit.transform.position;
						let enemyUnit_visionRange = enemyUnit.stats.visionRange || 600;
		
						let dist = allyUnit_position.distanceTo(enemyUnit_position);
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
			if(unit.Waypoints.length < 2)
				return false;// console.log(unit.transform.position);

			let dist = unit.transform.position.distanceTo(unit.Waypoints[1]);
			if(unit.Waypoints.length > 1 && dist < 0.1){
				console.log(unit.transform.position);
				unit.Waypoints.shift();
				continue;
			}

			let ms = unit.stats.MoveSpeed.Total / 1000;

			let dest = new Vector2();
			dest.subVectors(unit.Waypoints[1], unit.transform.position);
			dest.normalize().multiplyScalar(ms * diff);

			if(dest.length() > dist)
				unit.transform.position = unit.Waypoints[1];
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
			
			for(var i in global.Units){
				let unit = global.Units[i];
				let diff = performance.now() - time;
				let moved = this.move(unit, diff);
				this.moved[unit.netId] = moved;
			}
			this.visionProcess();

		}
	}
	async start(){

		this.update();
	}
}


module.exports = MovementSimulation;
