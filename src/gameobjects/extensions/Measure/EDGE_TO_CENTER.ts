
import PositionHelper__CENTER_TO_CENTER from './CENTER_TO_CENTER';

import GameObject from '../../GameObject';

export default class PositionHelper__EDGE_TO_CENTER extends PositionHelper__CENTER_TO_CENTER {

	/**
	 * @override
	 */
	static getRangeSum(source: GameObject, target: GameObject, range = 0): number {
		return range + (source.collisionRadius || 0);
	}

}
