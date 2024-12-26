
import MeasureCenterToCenter from './center-to-center';

import type GameObject from '../../game-object';

export default class MeasureEdgeToEdge extends MeasureCenterToCenter {

	/**
	 * @override
	 */
	static getRangeSum(source: GameObject, target: GameObject, range = 0) {
		return range + (source.collisionRadius || 0) + (target.collisionRadius || 0);
	}

}
