import type { Vector2Like } from "@repo/geometry";

export function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export function humanizeMS(ms: number) {
	const seconds = ms / 1000;
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	let text = '';
	if (hours > 0)
		text += `${hours}:`;
	if (minutes > 0)
		text += `${minutes % 60}:`;

	text += `${(seconds % 60).toFixed(3)}`;
	return text;
}

export function humanizeDecimal(num: number) {
	return Math.round(num * 1e3) / 1e3;
}

export function humanizePosition(position: Vector2Like) {
	return {
		x: humanizeDecimal(position.x),
		y: humanizeDecimal(position.y),
	};
}

export function humanizeWaypoints(waypoints: Vector2Like[]) {
	return waypoints.map(p => humanizePosition(p));
}

export function rgbaToInt(red: number, green: number, blue: number, alpha = 0) {
	return (red << 24) + (green << 16) + (blue << 8) + (alpha);
}
