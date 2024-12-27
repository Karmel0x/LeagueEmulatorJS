
import type GameObject from '../../game-object';
import MeasureCenterToCenter from './center-to-center';

export default class MeasureCenterToEdge extends MeasureCenterToCenter {

	/**
	 * @override
	 */
	static getRangeSum(source: GameObject, target: GameObject, range = 0) {
		return range + (target.collisionRadius || 0);
	}

}
