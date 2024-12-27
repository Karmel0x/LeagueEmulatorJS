
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
