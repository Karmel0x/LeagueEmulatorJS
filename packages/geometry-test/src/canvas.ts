export const canvasWrap = document.getElementById('canvasWrap')!;
export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;

export let zoom = 1;

export function resizeToWrap() {
	canvas.width = canvasWrap.clientWidth;
	canvas.height = canvasWrap.clientHeight;
	canvas.style.transform = '';
	canvas.style.transformOrigin = '';
	zoom = 1;
}
resizeToWrap();
window.addEventListener('resize', resizeToWrap);

canvasWrap.addEventListener('wheel', (ev) => {
	ev.preventDefault();
	const oldZoom = zoom;
	zoom *= ev.deltaY < 0 ? 1.1 : 1 / 1.1;
	zoom = Math.max(0.1, Math.min(10, zoom));

	canvas.style.transformOrigin = '0 0';
	canvas.style.transform = `scale(${zoom})`;

	// adjust scroll to keep pointer position stable
	const rect = canvasWrap.getBoundingClientRect();
	const px = ev.clientX - rect.left + canvasWrap.scrollLeft;
	const py = ev.clientY - rect.top + canvasWrap.scrollTop;
	const ratio = zoom / oldZoom;
	canvasWrap.scrollLeft = px * ratio - (ev.clientX - rect.left);
	canvasWrap.scrollTop = py * ratio - (ev.clientY - rect.top);
}, { passive: false });

export const methodLabelsEl = document.getElementById('methodLabels')!;
export const hiddenMethods = new Set<string>();
methodLabelsEl.onclick = (ev) => {
	const el = (ev.target as HTMLElement).closest('[data-method]') as HTMLElement | null;
	if (!el) return;
	const name = el.dataset.method!;
	if (hiddenMethods.has(name)) hiddenMethods.delete(name);
	else hiddenMethods.add(name);
};
