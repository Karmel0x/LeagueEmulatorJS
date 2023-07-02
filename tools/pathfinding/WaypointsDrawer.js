
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

class WaypointsDrawer {

	waypointsScale = 0.1;
	outputFile = '';

	canvas = null;
	context = null;
	hasChanged = false;

	constructor(mapId = 1) {
		const width = 15000 * this.waypointsScale;
		const height = 15000 * this.waypointsScale;

		this.canvas = createCanvas(width, height);
		this.context = this.canvas.getContext('2d');

		this.context.fillStyle = 'black';
		this.context.fillRect(0, 0, width, height);
		this.context.strokeStyle = 'red';
		this.context.lineWidth = 2;

		this.outputFile = `../waypointsDrawer_${mapId}.png`;
		loadImage(this.outputFile).then(image => {
			this.context.drawImage(image, 0, 0, width, height);
		}).catch(err => {
			//console.log(err);
		});

		setInterval(() => {
			this.saveFile();
		}, 10000);
	}

	saveFile() {
		if (!this.hasChanged)
			return;
		this.hasChanged = false;

		const buffer = this.canvas.toBuffer('image/png');
		fs.writeFile(this.outputFile, buffer, err => {
			console.log('WaypointsDrawer file:', this.outputFile, 'saved:', !err);
		});
	}

	drawWaypoints(waypoints) {
		if (waypoints.length < 2)
			return;

		waypoints = waypoints.map(waypoint => {
			return { x: waypoint.x * this.waypointsScale, y: waypoint.y * this.waypointsScale }
		});

		let lastWaypoint = null;
		waypoints.forEach(waypoint => {
			if (lastWaypoint) {
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


module.exports = WaypointsDrawer;
