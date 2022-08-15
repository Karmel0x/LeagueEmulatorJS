
const { Vector2 } = require('three');
const slotId = require('../Constants/slotId');


var waypointsDrawer = null;
try{
	const { createCanvas, loadImage } = require('canvas');
	const fs = require('fs');

	class WaypointsDrawer {

		waypointsScale = 0.1;
		outputFile = '../waypointsDrawer.png';
		//deleteFirstWaypoint = false;
		get deleteFirstWaypoint(){
			return !global.doNotUsePathfinding;
		}

		canvas = null;
		context = null;
		hasChanged = false;

		constructor(){
			const width = 15000 * this.waypointsScale;
			const height = 15000 * this.waypointsScale;

			this.canvas = createCanvas(width, height);
			this.context = this.canvas.getContext('2d');

			this.context.fillStyle = 'black';
			this.context.fillRect(0, 0, width, height);
			this.context.strokeStyle = 'red';
			this.context.lineWidth = 2;

			loadImage(this.outputFile).then(image => {
				this.context.drawImage(image, 0, 0, width, height);
			}).catch(err => {
				//console.log(err);
			});

			setInterval(() => {
				this.saveFile();
			}, 10000);
		}
		saveFile(){
			if(!this.hasChanged)
				return;
			this.hasChanged = false;

			const buffer = this.canvas.toBuffer('image/png');
			fs.writeFile(this.outputFile, buffer, err => {
				console.log('WaypointsDrawer file:', this.outputFile, 'saved:', !err);
			});
		}
		drawWaypoints(waypoints){
			if(this.deleteFirstWaypoint)
				waypoints.shift();

			if(waypoints.length < 2)
				return;

			waypoints = waypoints.map(waypoint => {
				return {x: waypoint.x * this.waypointsScale, y: waypoint.y * this.waypointsScale}
			});

			var lastWaypoint = null;
			waypoints.forEach(waypoint => {
				if(lastWaypoint){
					this.context.beginPath();
					this.context.moveTo(lastWaypoint.x, lastWaypoint.y);
					this.context.lineTo(waypoint.x, waypoint.y);
					this.context.stroke(); 
				}
				lastWaypoint = waypoint;
			});
			this.hasChanged = true;
		}
	}

	waypointsDrawer = new WaypointsDrawer();
}catch(e){
	//console.log(e);
}


const OrderTypes = {
	rightClickMove: 2,
	rightClickAttack: 3,
	sKeyStop: 10,
};

module.exports = (player, packet) => {
    //console.log('handle: C2S.IssueOrderReq');
	//console.log(packet);
    //console.log('position', packet.position, 'waypoints', packet.movementData.waypoints);

	player.attackTarget = null;
	player.acquisitionManual = null;
	player.autoAttackSoftToggle = false;

	if(packet.orderType == OrderTypes.rightClickMove){
		waypointsDrawer?.drawWaypoints(packet.movementData.waypoints);
		player.move0(packet);
		player.once('reachDestination', () => {
			player.autoAttackSoftToggle = true;
		});
	}
	else if(packet.orderType == OrderTypes.rightClickAttack){
		player.acquisitionManual = packet.targetNetId;
		player.autoAttackSoftToggle = true;
	}
	else if(packet.orderType == OrderTypes.sKeyStop){
		var movementData = {
			waypoints: [
				new Vector2(packet.position.x, packet.position.y),
			],
		};
		player.halt0(true, movementData);//todo:move to client position?
	}
};
