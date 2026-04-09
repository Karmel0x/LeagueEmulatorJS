import { state } from './types';

export const sliderRadius = document.getElementById('sliderRadius') as HTMLInputElement;
export const sliderSpeed = document.getElementById('sliderSpeed') as HTMLInputElement;
const valRadius = document.getElementById('valRadius')!;
const valSpeed = document.getElementById('valSpeed')!;
export const chkShowRadius = document.getElementById('chkShowRadius') as HTMLInputElement;
export const chkShowVelocity = document.getElementById('chkShowVelocity') as HTMLInputElement;
export const chkShowTrails = document.getElementById('chkShowTrails') as HTMLInputElement;
export const chkPaused = document.getElementById('chkPaused') as HTMLInputElement;
export const statsEl = document.getElementById('stats')!;

sliderRadius.oninput = () => valRadius.textContent = sliderRadius.value;
sliderSpeed.oninput = () => valSpeed.textContent = sliderSpeed.value;

const selectedGroup = document.getElementById('selectedGroup')!;
const selX = document.getElementById('selX') as HTMLInputElement;
const selY = document.getElementById('selY') as HTMLInputElement;
const selR = document.getElementById('selR') as HTMLInputElement;

export function updateSelectedPanel() {
	const selectedUnit = state.selectedUnit;
	if (!selectedUnit) {
		selectedGroup.style.display = 'none';
		return;
	}
	selectedGroup.style.display = '';
	if (document.activeElement !== selX) selX.value = String(selectedUnit.position.x);
	if (document.activeElement !== selY) selY.value = String(selectedUnit.position.y);
	if (document.activeElement !== selR) selR.value = String(selectedUnit.collisionRadius);
}

selX.oninput = () => { if (state.selectedUnit) state.selectedUnit.position.x = +selX.value; };
selY.oninput = () => { if (state.selectedUnit) state.selectedUnit.position.y = +selY.value; };
selR.oninput = () => { if (state.selectedUnit) state.selectedUnit.collisionRadius = Math.max(1, +selR.value); };
