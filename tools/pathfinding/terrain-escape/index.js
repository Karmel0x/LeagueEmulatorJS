
import { Vector2 } from 'three';
import unwalkable_grid from './unwalkable_grid.json';

unwalkable_grid.forEach((point, x) => {
	point.forEach((unwalkable, y) => {
		if (unwalkable === 1) {
			let nearestPoint = null;
			let nearestDistance = 99999;

			unwalkable_grid.forEach((point2, x2) => {
				point2.forEach((unwalkable2, y2) => {
					if (unwalkable2 === 0) {
						let p2 = new Vector2(x2, y2);
						let distance = p2.distanceTo(new Vector2(x, y));
						if (distance < nearestDistance) {
							nearestPoint = p2;
							nearestDistance = distance;
						}
					}

				});
			});

			if (nearestPoint) {
				unwalkable_grid[x][y] = [nearestPoint.x, nearestPoint.y];
			}
		}
	});
});

//console.log(unwalkable_grid);
console.log(JSON.stringify(unwalkable_grid));
