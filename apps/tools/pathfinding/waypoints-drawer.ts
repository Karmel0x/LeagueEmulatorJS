
import type { Vector2Like } from '@repo/geometry';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

export default class WaypointsDrawer {

	waypointsScale = 0.1;
	outputFile = '';

	canvas;
	context;
	hasChanged = false;

	constructor(mapId = 1) {
		const width = 15000 * this.waypointsScale;
		const height = 15000 * this.waypointsScale;

		let canvas = createCanvas(width, height);
		this.canvas = canvas;

		let context = canvas.getContext('2d');
		this.context = context;

		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);
		context.strokeStyle = 'red';
		context.lineWidth = 2;

		this.outputFile = `../waypointsDrawer_${mapId}.png`;
		this.loadFile();

		setInterval(() => {
			this.saveFile();
		}, 10000);
	}

	async loadFile() {
		let image = await loadImage(this.outputFile);
		this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
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

	drawWaypoints(waypoints: Vector2Like[]) {
		if (waypoints.length < 2)
			return;

		let waypointsScaled = waypoints.map(waypoint => {
			return { x: waypoint.x * this.waypointsScale, y: waypoint.y * this.waypointsScale };
		});

		let lastWaypoint: Vector2Like;
		waypointsScaled.forEach(waypoint => {
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
