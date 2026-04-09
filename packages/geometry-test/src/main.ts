import './style.css';

// Initialize all modules (side-effect imports for event listener registration)
import './canvas';
import './input';
import './pathfinding-overlay';
import './presets';

import { debugPoints } from './drawing';
import { update } from './simulation';

(window as any).addDebugPoint = (x: number, y: number, color = '#ff0', ttl = 30) => {
	debugPoints.push({ x, y, color, ttl });
};

// --- Start ---

requestAnimationFrame(update);
